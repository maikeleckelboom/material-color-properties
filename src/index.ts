import {
    argbFromHex,
    Blend,
    CustomColorGroup,
    hexFromArgb,
    Scheme,
    Theme,
    themeFromSourceColor,
    TonalPalette
} from "@importantimport/material-color-utilities"
import {hexAFromArgb, rgbFromHex, tokenize} from "./utils";
import defu from "defu";

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

interface Config {
    brightnessSuffix?: boolean,
    dark?: boolean,
    tones?: number[],
    prefix?: {
        palette?: string,
        color?: string,
        customColor?: string,
    }
}

type Properties = Record<string, string>

type RequiredDeep<T> = {
    [P in keyof T]-?: RequiredDeep<T[P]>
}

const propertiesFromTheme = (theme: Theme, options?: Config): Properties => {
    const defaultConfig: RequiredDeep<Config> = {
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
    Properties
}
