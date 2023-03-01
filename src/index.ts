import {
    argbFromHex,
    Blend,
    CustomColorGroup,
    hexFromArgb,
    Scheme,
    Theme,
    TonalPalette
} from "@importantimport/material-color-utilities"
import {hexAFromArgb, rgbFromHex, tokenize} from "./utils";

export interface TokenFormatOptions {
    tones?: number[],
    brightnessSuffix?: boolean,
    dark?: boolean
}

function derivePaletteProperties(theme: Theme, {
    tones,
    prefix
}: { tones: number[], prefix?: string }) {
    const properties = {} as Record<string, string>
    for (const [key, value] of Object.entries(theme.palettes)) {
        const tonalPalette = value instanceof TonalPalette ? value : TonalPalette.fromInt(value)
        for (const tone of tones) {
            properties[`--${prefix ?? ''}${tokenize(key)}${tone}`] = hexFromArgb(tonalPalette.tone(tone))
        }
    }
    return properties
}

function deriveSchemeProperties(scheme: Scheme, {
    prefix,
    suffix
}: { prefix?: string, suffix?: string }) {
    const properties = {} as Record<string, string>
    const entries = Object.entries(typeof scheme?.toJSON === 'function' ? scheme.toJSON() : scheme)
    for (const [key, value] of entries) {
        properties[`--${prefix ?? ''}${tokenize(key)}${suffix ?? ''}`] = hexFromArgb(value)
    }
    return properties
}

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

function rgbProperties(properties: Record<string, string>) {
    return Object.entries(properties).reduce((acc, [name, hex]) => ({
        ...acc,
        [`${name}-rgb`]: rgbFromHex(hex)
    }), {} as Record<string, string>)
}

function paletteFromCustomColor(customColor: CustomColorGroup, {tones}: { tones: number[] }) {
    let tonalPalette = TonalPalette.fromInt(customColor.color.value)
    if (customColor.color.blend) {
        // TODO: use source color from config
        const sourceColor = argbFromHex('#2861b6')
        const harmonized = Blend.harmonize(customColor.color.value, sourceColor)
        tonalPalette = TonalPalette.fromInt(harmonized)
    }
    tones.forEach(tone => tonalPalette.tone(tone))
    return tonalPalette
}

function deriveCustomSchemeProperties(colorGroup: CustomColorGroup, options?: {
    suffix?: string,
    prefix?: string,
    dark?: boolean
}) {
    const properties = {} as Record<string, string>
    for (const [key, value] of Object.entries(colorGroup[options?.dark ? 'dark' : 'light'])) {
        const name = colorGroup.color.name.replace(/^\W+|\W+$|\s/g, '-').toLowerCase()
        const map = key.replace(/([a-z])(?=[A-Z])/g, '$1-').toLowerCase()
        const token = map.replace(/color/, name)
        properties[`--${options?.prefix ?? ''}${token}${options?.suffix ?? ''}`] = hexFromArgb(value as number)
    }
    return properties
}

function deriveCustomPaletteProperties(customColors: CustomColorGroup[], {
    tones,
    prefix,
    suffix
}: { tones: number[], prefix?: string, suffix?: string }) {
    const properties: Record<string, string> = {}
    for (const customColor of customColors) {
        const palette = paletteFromCustomColor(customColor, {tones})
        tones.forEach((tone: number) => {
            const name = customColor.color.name.replace(/^\W+|\W+$|\s/g, '-').toLowerCase()
            const token = `--${prefix ?? ''}${name}${tone}${suffix ?? ''}`
            properties[token] = hexFromArgb(palette.tone(tone))
        })
    }
    return properties
}

function deriveProperties(theme: Theme, {
    dark,
    tones,
    brightnessSuffix,
    prefix
}: {
    dark: boolean,
    tones: number[],
    brightnessSuffix: boolean,
    prefix: {
        palette?: string,
        scheme?: string,
        customScheme?: string
    }
}) {

    const palettes = derivePaletteProperties(theme, {
        tones,
        prefix: prefix.palette
    })
    const schemes = {
        ...deriveSchemeProperties(theme.schemes[dark ? 'dark' : 'light'], {
            prefix: prefix.scheme
        }),
        ...brightnessSuffix
            ? {
                ...deriveSchemeProperties(theme.schemes.light, {
                    prefix: prefix.scheme,
                    suffix: '-light'
                }),
                ...deriveSchemeProperties(theme.schemes.dark, {
                    prefix: prefix.scheme,
                    suffix: '-dark'
                })
            }
            : {}
    }
    const surfaceElevations = {
        ...deriveSurfaceElevationProperties(theme.source, {
            prefix: prefix.scheme,
        }),
        ...brightnessSuffix
            ? {
                ...deriveSurfaceElevationProperties(theme.source, {
                    prefix: prefix.scheme,
                    suffix: '-light'
                }),
                ...deriveSurfaceElevationProperties(theme.source, {
                    prefix: prefix.scheme,
                    suffix: '-dark'
                })
            }
            : {}
    }

    const ccPalettes = deriveCustomPaletteProperties(theme.customColors, {
        tones,
        prefix: prefix.palette
    })

    const ccSchemes = theme.customColors.reduce((acc, color) => ({
        ...acc,
        ...deriveCustomSchemeProperties(color, {
            prefix: prefix.customScheme,
            dark
        }),
        ...brightnessSuffix
            ? {
                ...deriveCustomSchemeProperties(color, {
                    prefix: prefix.customScheme,
                    suffix: '-light'
                }),
                ...deriveCustomSchemeProperties(color, {
                    prefix: prefix.customScheme,
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

const propertiesFromTheme = (theme: Theme, options: TokenFormatOptions = {}) => {

    interface PropertiesDefaults {
        tones: number[],
        brightnessSuffix: boolean,
        dark: boolean,
        prefix: {
            palette: string,
            scheme: string,
            custom: string
        }
    }

    const defaults: PropertiesDefaults = {
        tones: [0, 5, 10, 20, 30, 40, 50, 60, 70, 80, 95, 99, 100],
        brightnessSuffix: true,
        dark: false,
        prefix: {
            palette: 'md-ref-palette-',
            scheme: 'md-sys-color-',
            custom: 'md-custom-color-'
        }
    }

    const {tones, brightnessSuffix, dark, prefix} = Object.assign({}, defaults, options)

    return deriveProperties(theme, {
        tones,
        brightnessSuffix,
        dark,
        prefix
    })
}

export {
    propertiesFromTheme,
}
