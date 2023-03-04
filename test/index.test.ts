import {describe, it, expect, test} from "vitest";
import {argbFromHex, themeFromSourceColor} from "@importantimport/material-color-utilities";
import {propertiesFromTheme} from "../src";

describe("index", () => {
    const sourceColor = argbFromHex('#40a673')
    const customColors = [
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
    ]

    const theme = themeFromSourceColor(sourceColor, customColors)

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
        const propertiesWithCustomColors = propertiesFromTheme(theme)

        it("should have properties for custom colors", () => {
            expect(propertiesWithCustomColors)
                .toHaveProperty('--md-custom-color-custom-color2')
        })

        it("should have RGB variant properties for customColor", () => {
            expect(propertiesWithCustomColors).toHaveProperty('--md-custom-color-custom-color2-rgb')
        })
    })
})



