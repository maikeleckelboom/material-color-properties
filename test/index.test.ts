import {describe, it, expect, vitest} from "vitest";
import {argbFromHex, themeFromSourceColor} from "@importantimport/material-color-utilities";
import {propertiesFromTheme} from "../src";

describe("index", () => {
    const sourceColor = argbFromHex('#40a673')
    const theme = themeFromSourceColor(sourceColor)

    describe("When propertiesFromTheme is called without optional arguments", () => {
        const properties = propertiesFromTheme(theme)

        it("should return an object", () => {
            expect(properties).toBeInstanceOf(Object)
        })

        it("should have properties for palette", () => {
            expect(properties).toHaveProperty('--md-ref-palette-primary0')
            expect(properties).toHaveProperty('--md-ref-palette-primary50')
            expect(properties).toHaveProperty('--md-ref-palette-primary100')
        })

        it("should have properties for color", () => {
            expect(properties).toHaveProperty('--md-sys-color-primary')
            expect(properties).toHaveProperty('--md-sys-color-secondary')
            expect(properties).toHaveProperty('--md-sys-color-error')
        })

        it("should have RGB variant properties for color", () => {
            expect(properties).toHaveProperty('--md-sys-color-primary-rgb')
            expect(properties).toHaveProperty('--md-sys-color-secondary-rgb')
            expect(properties).toHaveProperty('--md-sys-color-error-rgb')
        })
    })

    describe("When propertiesFromTheme is called with brightnessSuffix", () => {
        const propertiesWithBrightnessSuffix = propertiesFromTheme(theme, {
            brightnessSuffix: true
        })
        it("should return an object with brightness suffix", () => {
            expect(propertiesWithBrightnessSuffix).toHaveProperty('--md-sys-color-primary-light')
            expect(propertiesWithBrightnessSuffix).toHaveProperty('--md-sys-color-primary-dark')
        })
    })

    describe("When propertiesFromTheme is called with dark", () => {
        const propertiesWithDark = propertiesFromTheme(theme, {
            dark: true
        })
        
        it("should return an object with dark", () => {
            expect(propertiesWithDark).toHaveProperty('--md-sys-color-primary-dark')
        })
    })

    describe("When propertiesFromTheme is called with custom prefix", () => {
        const propertiesWithCustomPrefix = propertiesFromTheme(theme, {
            prefix: {
                palette: 'test-palette-',
                customColor: 'test-custom-color-',
                color: 'test-color-'
            }
        })
        it("it should return an object with custom prefix", () => {
            expect(propertiesWithCustomPrefix).toHaveProperty('--test-color-primary')
        })
    })

    describe("When the theme object contains custom colors", () => {
        const themeWithCustomColors = themeFromSourceColor(sourceColor, [
            {
                name: 'customColor1',
                value: argbFromHex('#40a673'),
                blend: true,
            },
            {
                name: 'customColor2',
                value: argbFromHex('#40a673'),
                blend: true,
            }
        ])

        const propertiesWithCustomColors = propertiesFromTheme(themeWithCustomColors)

        it("should have properties for custom colors", () => {
            expect(propertiesWithCustomColors).toHaveProperty('--md-custom-color-custom-color2')
        })

        it("should have RGB variant properties for customColor", () => {
            expect(propertiesWithCustomColors).toHaveProperty('--md-custom-color-custom-color2-rgb')
        })
    })
})

/*
describe('derivePaletteProperties', () => {
    const sourceColor = 0x40a673
    const theme = themeFromSourceColor(sourceColor)

    test('returns empty object if tones array is empty', () => {
        const result = derivePaletteProperties(theme, {tones: []})
        expect(result).toEqual({})
    })


    test('returns expected properties when prefix is undefined', () => {
        const result = derivePaletteProperties(theme, {tones: [100]})
        expect(result).toEqual({
            '--primary100': '#ffffff',
            '--secondary100': '#ffffff',
            '--tertiary100': '#ffffff',
            '--neutral100': '#ffffff',
            '--neutral-variant100': '#ffffff',
            '--error100': '#ffffff'
        })
    })

    test('returns expected properties when prefix is defined', () => {
        const result = derivePaletteProperties(theme, {tones: [100], prefix: 'prefix-'})
        expect(result).toEqual({
            '--prefix-primary100': '#ffffff',
            '--prefix-secondary100': '#ffffff',
            '--prefix-tertiary100': '#ffffff',
            '--prefix-neutral100': '#ffffff',
            '--prefix-neutral-variant100': '#ffffff',
            '--prefix-error100': '#ffffff'
        })
    })
})
*/
