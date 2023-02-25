import {
    argbFromHex, Blend,
    CustomColorGroup,
    hexFromArgb,
    Scheme,
    Theme,
    TonalPalette
} from "@importantimport/material-color-utilities"

const tokenize = (str: string) => str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .toLowerCase()

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

const camelize = (str: string) => str
    .split('-')
    .map((word, index) => index === 0 ? word : capitalize(word))
    .join('')

const rgbFromHex = (hex: string) => {
    const [r, g, b] = hex.match(/\w\w/g)?.map(x => parseInt(x, 16)) ?? [0, 0, 0]
    return `${r}, ${g}, ${b}`
}

const hexAFromArgb = (value: number, alpha: number) => {
    return `${hexFromArgb(value)}${Math.round(alpha * 255).toString(16).padStart(2, '0')}`
}

function buildPaletteProperties (theme: Theme, {
    tones,
    prefix
}: { tones: number[], prefix?: string }) {
    const properties = {} as Record<string, string>
    for (const [key, value] of Object.entries(theme.palettes)) {
        const tonalPalette = value instanceof TonalPalette ? value :
            TonalPalette.fromInt(value)
        for (const tone of tones) {
            properties[`--${prefix ?? ''}${tokenize(key)}${tone}`] = hexFromArgb(tonalPalette.tone(tone))
        }
    }
    return properties
}

function buildSchemeProperties (scheme: Scheme, {
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

function buildSurfaceElevationProperties (argb: number, options: {
    prefix?: string,
    suffix?: string,
    tones?: number[]
}) {
    const properties = {} as Record<string, string>
    const tones = options?.tones ?? [0, 0.05, 0.08, 0.11, 0.12, 0.14]
    tones.forEach((tone, index) => {
        const color = hexAFromArgb(argb, tone)
        const token = `--${options?.prefix ?? ''}-surface${index}${options?.suffix ?? ''}`
        properties[token] = color
    })
    return properties
}

const getRgbProperties = (properties: Record<string, string>) => {
    return Object.entries(properties).reduce((acc, [name, hex]) => ({
        ...acc,
        [`${name}-rgb`]: rgbFromHex(hex)
    }), {} as Record<string, string>)
}

function paletteFromCustomColor (customColor: CustomColorGroup, { tones }: { tones: number[] }) {
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

function buildCustomSchemeProperties (colorGroup: CustomColorGroup, options?: {
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

function buildCustomPaletteProperties (customColors: CustomColorGroup[], {
    tones,
    prefix,
    suffix
}: { tones: number[], prefix?: string, suffix?: string }) {
    const properties: Record<string, string> = {}
    for (const customColor of customColors) {
        const palette = paletteFromCustomColor(customColor, { tones })
        tones.forEach((tone: number) => {
            const name = customColor.color.name.replace(/^\W+|\W+$|\s/g, '-').toLowerCase()
            const token = `--${prefix ?? ''}${name}${tone}${suffix ?? ''}`
            properties[token] = hexFromArgb(palette.tone(tone))
        })
    }
    return properties
}

function collectProperties (theme: Theme, {
    dark,
    tones,
    brightnessSuffix
}: { dark: boolean, tones: number[], brightnessSuffix: boolean }) {

    const palettes = buildPaletteProperties(theme, {
        tones,
        prefix: 'md-ref-palette-'
    })
    const schemes = {
        ...buildSchemeProperties(theme.schemes[dark ? 'dark' : 'light'], {
            prefix: 'md-sys-color-'
        }),
        ...brightnessSuffix
            ? {
                ...buildSchemeProperties(theme.schemes.light, {
                    prefix: 'md-sys-color-',
                    suffix: '-light'
                }),
                ...buildSchemeProperties(theme.schemes.dark, {
                    prefix: 'md-sys-color-',
                    suffix: '-dark'
                })
            }
            : {}
    }
    const surfaceElevations = {
        ...buildSurfaceElevationProperties(theme.source, {
            prefix: 'md-sys-color'
        }),
        ...brightnessSuffix
            ? {
                ...buildSurfaceElevationProperties(theme.source, {
                    prefix: 'md-sys-color-',
                    suffix: '-light'
                }),
                ...buildSurfaceElevationProperties(theme.source, {
                    prefix: 'md-sys-color-',
                    suffix: '-dark'
                })
            }
            : {}
    }

    const ccPalettes = buildCustomPaletteProperties(theme.customColors, {
        tones,
        prefix: 'md-ref-palette-',
    })

    const ccSchemes = theme.customColors.reduce((acc, color) => ({
        ...acc,
        ...buildCustomSchemeProperties(color, {
            prefix: 'md-custom-color-',
            dark
        }),
        ...brightnessSuffix
            ? {
                ...buildCustomSchemeProperties(color, {
                    prefix: 'md-custom-color-',
                    suffix: '-light'
                }),
                ...buildCustomSchemeProperties(color, {
                    prefix: 'md-custom-color-',
                    suffix: '-dark'
                })
            }
            : {}
    }), {})

    const schemesRgb = getRgbProperties(schemes)
    const ccSchemesRgb = getRgbProperties(ccSchemes)

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

const propertiesFromTheme = (theme: Theme, options?: { tones?: number[], brightnessSuffix?: boolean, dark?: boolean }) => {

    const defaults = {
        tones: [0, 5, 10, 20, 30, 40, 50, 60, 70, 80, 95, 99, 100],
        brightnessSuffix: true,
        dark: true,
    }

    const opts = Object.assign({}, defaults, options)

    const { tones, brightnessSuffix, dark } = opts

    const properties = collectProperties(theme, {
        tones,
        brightnessSuffix,
        dark
    })

    console.log('🚀 properties', properties)

    return properties
}

export {
    propertiesFromTheme
}
