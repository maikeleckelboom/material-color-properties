import {
    Blend,
    CustomColorGroup,
    hexFromArgb,
    Scheme,
    Theme,
    TonalPalette
} from "@importantimport/material-color-utilities";

import {hexAFromArgb, rgbFromHex, tokenize} from "./utils";

/**
 * Defines a configuration object that can
 * have optional properties for a color palette.
 * @typedef {Object} ConfigOptions
 */
interface ConfigOptions {
    // Whether to append a suffix to color names that indicate their brightness level.
    brightnessSuffix?: boolean,
    // Whether the configuration is for a dark mode.
    dark?: boolean,
    // An array of numbers representing the tones to be used in the color palette.
    tones?: number[],
    // An object that can have optional properties for the name of the palette,
    // the name of the base color, and a custom color.
    prefix?: {
        palette?: string,
        color?: string,
        customColor?: string,
    }
}

/**
 * A utility type that defines the properties of a CSS custom property.
 * @typedef {Object<string, string>} Properties
 */
type Properties = Record<string, string>

/**
 * A utility type that recursively makes all properties of an object required.
 * @typedef {Object} RequiredDeep
 */
type RequiredDeep<T> = {
    [P in keyof T]-?: RequiredDeep<T[P]>
}

/**
 * A type that is derived from `ConfigOptions` and makes all its properties required.
 * @typedef {Object} DefaultConfig
 */
type DefaultConfig = RequiredDeep<ConfigOptions>

/**
 * @param {Theme} theme - The theme to derive custom properties from
 * @param {Object} options - An object containing optional properties for customizing the derived properties
 * @param {Array<number>} options.tones - An array of numbers representing the tones to derive custom properties for
 * @param {string} [options.prefix] - An optional prefix to add to the beginning of each derived custom property name
 * @returns {Properties} An object with CSS custom properties derived from the theme
 */
function derivePaletteProperties(theme: Theme, {
    tones,
    prefix
}: { tones: number[], prefix?: string }): Properties {
    const properties = {} as Record<string, string>
    for (const [key, value] of Object.entries(theme.palettes)) {
        const tonalPalette = value instanceof TonalPalette ? value : TonalPalette.fromInt(value)
        for (const tone of tones) {
            properties[`--${prefix ?? ''}${tokenize(key)}${tone}`] = hexFromArgb(tonalPalette.tone(tone))
        }
    }
    return properties
}

/**
 * @param scheme The color scheme to derive properties from.
 * @param prefix An optional prefix to add to each custom property.
 * @param suffix An optional suffix to add to each custom property.
 * @returns An object with CSS custom properties derived from the color scheme.
 */
function deriveSchemeProperties(scheme: Scheme, {
    prefix,
    suffix
}: { prefix?: string, suffix?: string }): Properties {
    const properties = {} as Record<string, string>
    const entries = Object.entries(typeof scheme?.toJSON === 'function' ? scheme.toJSON() : scheme)
    for (const [key, value] of entries) {
        properties[`--${prefix ?? ''}${tokenize(key)}${suffix ?? ''}`] = hexFromArgb(value)
    }
    return properties
}

/**
 * @param argb The color to derive properties from.
 * @param options An object with optional properties for a prefix, suffix, and tones.
 */
function deriveSurfaceElevationProperties(argb: number, options: {
    prefix?: string,
    suffix?: string,
    tones?: number[]
}) {
    const properties = {} as Record<string, string>
    const tones = options?.tones ?? [0, 0.05, 0.08, 0.11, 0.12, 0.14]
    tones.forEach((tone, index) => {
        const color = hexAFromArgb(argb, tone)
        const token = `--${options?.prefix ?? ''}surface-level${index}${options?.suffix ?? ''}`
        properties[token] = color
    })
    return properties
}

/**
 * @param {Record<string, string>} properties - A Record object containing CSS custom properties with hex color values.
 * @returns {Record<string, string>} A new Record object with CSS custom properties and their corresponding RGB color values.
 */
function rgbProperties(properties: Record<string, string>) {
    return Object.entries(properties).reduce((acc, [name, hex]) => ({
        ...acc,
        [`${name}-rgb`]: rgbFromHex(hex)
    }), {} as Record<string, string>)
}

/**
 * @param {CustomColorGroup} customColor - A CustomColorGroup object representing the base color of the palette.
 * @param {object} options - An options object containing the tones and sourceColor properties.
 * @param {number[]} options.tones - An array of tones to apply to the palette.
 * @param {number} options.sourceColor - The source color to use for blending if the base color is a blend.
 * @returns {TonalPalette} The derived tonal palette.
 */
function paletteFromCustomColor(customColor: CustomColorGroup, {
    tones,
    sourceColor
}: { tones: number[], sourceColor: number }) {
    let tonalPalette = TonalPalette.fromInt(customColor.color.value)
    if (customColor.color.blend) {
        const harmonized = Blend.harmonize(customColor.color.value, sourceColor)
        tonalPalette = TonalPalette.fromInt(harmonized)
    }
    tones.forEach(tone => tonalPalette.tone(tone))
    return tonalPalette
}

/**
 * @param {CustomColorGroup} colorGroup - The color group to derive properties for.
 * @param {object} [options] - Optional configuration for prefix, suffix, and dark mode.
 * @param {string} [options.prefix] - Optional prefix to prepend to each CSS custom property name.
 * @param {string} [options.suffix] - Optional suffix to append to each CSS custom property name.
 * @param {boolean} [options.dark] - Optional boolean flag indicating whether to use the "dark" color scheme.
 * @returns {Record<string, string>} - Object containing CSS custom property names and values.
 */
function deriveCustomSchemeProperties(colorGroup: CustomColorGroup, options?: {
    suffix?: string,
    prefix?: string,
    dark?: boolean
}) {
    const properties = {} as Record<string, string>
    for (const [key, value] of Object.entries(colorGroup[options?.dark ? 'dark' : 'light'])) {
        const name = tokenize(colorGroup.color.name)
        const map = key.replace(/([a-z])(?=[A-Z])/g, '$1-').toLowerCase()
        const token = map.replace(/color/, name)
        properties[`--${options?.prefix ?? ''}${token}${options?.suffix ?? ''}`] = hexFromArgb(value as number)
    }
    return properties
}

/**
 * @param customColors An array of CustomColorGroup objects.
 * @param tones An array of numbers representing the tones to derive custom properties for.
 * @param prefix An optional prefix to prepend to each custom property name.
 * @param suffix An optional suffix to append to each custom property name.
 * @param sourceColor The source color to use for blending if the base color is a blend.
 */
function deriveCustomPaletteProperties(customColors: CustomColorGroup[], {
    tones,
    prefix,
    suffix,
    sourceColor
}: { tones: number[], prefix?: string, suffix?: string, sourceColor: number }) {
    const properties: Record<string, string> = {}
    for (const customColor of customColors) {
        const palette = paletteFromCustomColor(customColor, {tones, sourceColor})
        tones.forEach((tone: number) => {
            const name = customColor.color.name.replace(/^\W+|\W+$|\s/g, '-').toLowerCase()
            const token = `--${prefix ?? ''}${name}${tone}${suffix ?? ''}`
            properties[token] = hexFromArgb(palette.tone(tone))
        })
    }
    return properties
}

/**
 * @param {Theme} theme - A Theme object.
 * @param {object} options - An options object containing the tones and prefix properties.
 * @param {number[]} options.tones - An array of tones to apply to the palette.
 * @param {string} options.prefix - A prefix to prepend to each CSS custom property name.
 * @returns {Record<string, string>} - Object containing CSS custom property names and values.
 */
function deriveProperties(theme: Theme, {
    dark,
    tones,
    brightnessSuffix,
    prefix
}: {
    dark: boolean,
    tones: number[],
    brightnessSuffix?: boolean,
    prefix?: {
        palette?: string,
        color?: string,
        customColor?: string
    }
}) {
    const palettes = derivePaletteProperties(theme, {
        tones,
        prefix: prefix?.palette
    })
    const schemes = {
        ...deriveSchemeProperties(theme.schemes[dark ? 'dark' : 'light'], {
            prefix: prefix?.color
        }),
        ...brightnessSuffix
            ? {
                ...deriveSchemeProperties(theme.schemes.light, {
                    prefix: prefix?.color,
                    suffix: '-light'
                }),
                ...deriveSchemeProperties(theme.schemes.dark, {
                    prefix: prefix?.color,
                    suffix: '-dark'
                })
            }
            : {}
    }
    const surfaceElevations = {
        ...deriveSurfaceElevationProperties(theme.source, {
            prefix: prefix?.color,
        }),
        ...brightnessSuffix
            ? {
                ...deriveSurfaceElevationProperties(theme.source, {
                    prefix: prefix?.color,
                    suffix: '-light'
                }),
                ...deriveSurfaceElevationProperties(theme.source, {
                    prefix: prefix?.color,
                    suffix: '-dark'
                })
            }
            : {}
    }

    const ccPalettes = deriveCustomPaletteProperties(theme.customColors, {
        tones,
        prefix: prefix?.palette,
        sourceColor: theme.source
    })

    const ccSchemes = theme.customColors.reduce((acc, color) => ({
        ...acc,
        ...deriveCustomSchemeProperties(color, {
            prefix: prefix?.customColor,
            dark
        }),
        ...brightnessSuffix
            ? {
                ...deriveCustomSchemeProperties(color, {
                    prefix: prefix?.customColor,
                    suffix: '-light'
                }),
                ...deriveCustomSchemeProperties(color, {
                    prefix: prefix?.customColor,
                    suffix: '-dark'
                })
            }
            : {}
    }), {})

    const schemesRgb = rgbProperties(schemes)

    const ccSchemesRgb = rgbProperties(ccSchemes)

    return {
        ...palettes,
        ...schemes,
        ...surfaceElevations,
        ...ccPalettes,
        ...ccSchemes,
        ...schemesRgb,
        ...ccSchemesRgb
    }
}

/**
 * @param {Theme} theme - A Theme object.
 * @param {object} [options] - Optional configuration for prefix, suffix, and dark mode.
 * @param {string} [options.prefix] - Optional prefix to prepend to each CSS custom property name.
 * @param {string} [options.suffix] - Optional suffix to append to each CSS custom property name.
 * @param {boolean} [options.dark] - Optional boolean flag indicating whether to use the "dark" color scheme.
 * @returns {Record<string, string>} - Object containing CSS custom property names and values.
 * @example
 * const theme = themeFromSourceColor(argbFromHex('#ff0000'))
 * // => { source: 4294901760, schemes: { light: { ... }, dark: { ... } } }
 * const properties = propertiesFromTheme(theme)
 * // => { '--md-ref-palette-primary100': '#ffffff', '--md-sys-color-primary': '#ff0000', ... }
 */
const propertiesFromTheme = (theme: Theme, options?: ConfigOptions): Properties => {
    const defaultConfig: DefaultConfig = {
        tones: [0, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
        dark: false,
        brightnessSuffix: true,
        prefix: {
            palette: 'md-ref-palette-',
            color: 'md-sys-color-',
            customColor: 'md-custom-color-',
        }
    }
    return deriveProperties(theme, {
        ...defaultConfig,
        ...options,
        prefix: {
            ...defaultConfig.prefix,
            ...(options?.prefix ?? {}),
        }
    })
}

export {
    propertiesFromTheme,
    hexAFromArgb,
    rgbFromHex,
    tokenize,
}
