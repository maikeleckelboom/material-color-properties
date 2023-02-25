import {
    ColorGroup,
    CustomColorGroup,
    CustomColor,
    Hct,
    Theme,
    TonalPalette,
    CorePalette,
    Score,
    Scheme,
    themeFromSourceColor,
    customColor,
    themeFromImage,
    alphaFromArgb,
    argbFromHex,
    hexFromArgb,
} from '@importantimport/material-color-utilities'

const useMaterialColorProperties = (theme: any) => {
    console.log('🚀 useMaterialColorProperties called from index.ts')
    console.log('🚀 theme', theme)
    const source = argbFromHex(theme.primary)
    const palette = CorePalette.of(source)
    const schemes = {
        light: Scheme.light(source),
        dark: Scheme.dark(source),
    }
    const palettes = {
        primary: palette.a1,
        secondary: palette.a2,
        tertiary: palette.a3,
        neutral: palette.n1,
        neutralVariant: palette.n2,
        error: palette.error,
    }

    const customColors = theme.customColors.map((c: any) => customColor(source, c))
    return {
        source,
        schemes,
        palettes,
        customColors,
    }
}

export {
    ColorGroup,
    CustomColorGroup,
    CustomColor,
    Hct,
    Theme,
    TonalPalette,
    CorePalette,
    Score,
    Scheme,
    themeFromSourceColor,
    customColor,
    themeFromImage,
    alphaFromArgb,
    argbFromHex,
    hexFromArgb,
    useMaterialColorProperties
}
