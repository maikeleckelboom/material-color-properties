import {describe, expect, it,test} from "vitest";
import {argbFromHex, themeFromSourceColor} from "@material/material-color-utilities";
import {propertiesFromTheme, rgbFromHex} from "../src";

describe("index", () => {
    const sourceColor = argbFromHex('#4060a6')
    const customColors = [
        {
            name: 'Custom Color 1',
            value: argbFromHex('#40a673'),
            blend: true,
        },
        {
            name: 'Indian Red',
            value: argbFromHex('#a64040'),
            blend: false,
        }
    ]
    const theme = themeFromSourceColor(sourceColor, customColors)
    const properties = propertiesFromTheme(theme, {
        rgb: {
            include: true,
            separator: ' '
        }
    })

    describe("When propertiesFromTheme is called without optional arguments", () => {

        it("should return an object", () => {
            expect(properties).toBeInstanceOf(Object)
        })

        it('Should have correct token format for custom color palette', () => {
            expect(properties).toHaveProperty('--md-ref-palette-custom-color10')
        })

        it("Palette should exhibit properties that match the given tones", () => {
            expect(properties).toHaveProperty('--md-ref-palette-primary0')
            expect(properties).toHaveProperty('--md-ref-palette-primary10')
            expect(properties).toHaveProperty('--md-ref-palette-primary20')
            expect(properties).toHaveProperty('--md-ref-palette-primary30')
            expect(properties).toHaveProperty('--md-ref-palette-primary40')
            expect(properties).toHaveProperty('--md-ref-palette-primary50')
            expect(properties).toHaveProperty('--md-ref-palette-primary60')
            expect(properties).toHaveProperty('--md-ref-palette-primary70')
            expect(properties).toHaveProperty('--md-ref-palette-primary80')
            expect(properties).toHaveProperty('--md-ref-palette-primary90')
            expect(properties).toHaveProperty('--md-ref-palette-primary100')
        })

        // Scheme should have all the properties that are required for a Material Design theme
        it("Scheme should have all the properties that are required for a Material Design theme ", () => {
            expect(properties).toHaveProperty('--md-sys-color-primary')
            expect(properties).toHaveProperty('--md-sys-color-secondary')
            expect(properties).toHaveProperty('--md-sys-color-tertiary')
            expect(properties).toHaveProperty('--md-sys-color-error')
            expect(properties).toHaveProperty('--md-sys-color-surface')
            expect(properties).toHaveProperty('--md-sys-color-background')
            expect(properties).toHaveProperty('--md-sys-color-outline')
            expect(properties).toHaveProperty('--md-sys-color-outline-variant')
            expect(properties).toHaveProperty('--md-sys-color-surface-variant')
            expect(properties).toHaveProperty('--md-sys-color-primary-container')
            expect(properties).toHaveProperty('--md-sys-color-secondary-container')
            expect(properties).toHaveProperty('--md-sys-color-tertiary-container')
            expect(properties).toHaveProperty('--md-sys-color-on-primary')
            expect(properties).toHaveProperty('--md-sys-color-on-secondary')
            expect(properties).toHaveProperty('--md-sys-color-on-tertiary')
            expect(properties).toHaveProperty('--md-sys-color-on-surface')
            expect(properties).toHaveProperty('--md-sys-color-on-background')
            expect(properties).toHaveProperty('--md-sys-color-on-surface-variant')
            expect(properties).toHaveProperty('--md-sys-color-on-primary-container')
            expect(properties).toHaveProperty('--md-sys-color-on-secondary-container')
            expect(properties).toHaveProperty('--md-sys-color-on-tertiary-container')
            expect(properties).toHaveProperty('--md-sys-color-on-error')
            expect(properties).toHaveProperty('--md-sys-color-inverse-primary')
        })

        it("should have RGB variant properties for color", () => {
            expect(properties).toHaveProperty('--md-sys-color-primary-rgb')
            expect(properties).toHaveProperty('--md-sys-color-secondary-rgb')
            expect(properties).toHaveProperty('--md-sys-color-tertiary-rgb')
            expect(properties).toHaveProperty('--md-sys-color-error-rgb')
            expect(properties).toHaveProperty('--md-sys-color-surface-rgb')
            expect(properties).toHaveProperty('--md-sys-color-background-rgb')
            expect(properties).toHaveProperty('--md-sys-color-outline-rgb')
            expect(properties).toHaveProperty('--md-sys-color-outline-variant-rgb')
            expect(properties).toHaveProperty('--md-sys-color-surface-variant-rgb')
            expect(properties).toHaveProperty('--md-sys-color-primary-container-rgb')
            expect(properties).toHaveProperty('--md-sys-color-secondary-container-rgb')
            expect(properties).toHaveProperty('--md-sys-color-tertiary-container-rgb')
            expect(properties).toHaveProperty('--md-sys-color-on-primary-rgb')
            expect(properties).toHaveProperty('--md-sys-color-on-secondary-rgb')
            expect(properties).toHaveProperty('--md-sys-color-on-tertiary-rgb')
            expect(properties).toHaveProperty('--md-sys-color-on-surface-rgb')
            expect(properties).toHaveProperty('--md-sys-color-on-background-rgb')
            expect(properties).toHaveProperty('--md-sys-color-on-surface-variant-rgb')
            expect(properties).toHaveProperty('--md-sys-color-on-primary-container-rgb')
            expect(properties).toHaveProperty('--md-sys-color-on-secondary-container-rgb')
            expect(properties).toHaveProperty('--md-sys-color-on-tertiary-container-rgb')
            expect(properties).toHaveProperty('--md-sys-color-on-error-rgb')
            expect(properties).toHaveProperty('--md-sys-color-inverse-primary-rgb')
            expect(properties).toHaveProperty('--md-sys-color-error-rgb')
            expect(properties).toHaveProperty('--md-sys-color-inverse-primary-rgb')
        })

        it("should have rgb variant properties for palette", () => {
            expect(properties).toHaveProperty('--md-ref-palette-primary0-rgb')
            expect(properties).toHaveProperty('--md-ref-palette-primary10-rgb')
            expect(properties).toHaveProperty('--md-ref-palette-primary20-rgb')
            expect(properties).toHaveProperty('--md-ref-palette-primary30-rgb')
            expect(properties).toHaveProperty('--md-ref-palette-primary40-rgb')
            expect(properties).toHaveProperty('--md-ref-palette-primary50-rgb')
            expect(properties).toHaveProperty('--md-ref-palette-primary60-rgb')
            expect(properties).toHaveProperty('--md-ref-palette-primary70-rgb')
            expect(properties).toHaveProperty('--md-ref-palette-primary80-rgb')
            expect(properties).toHaveProperty('--md-ref-palette-primary90-rgb')
            expect(properties).toHaveProperty('--md-ref-palette-primary100-rgb')
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

        it("should return with default color", () => {
            expect(propertiesWithDark).toHaveProperty('--md-sys-color-primary')
        })

        it("should return an object with dark", () => {
            expect(propertiesWithDark).toHaveProperty('--md-sys-color-primary-dark')
        })

        it("should return an object with light", () => {
            expect(propertiesWithDark).toHaveProperty('--md-sys-color-primary-light')
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
                .toHaveProperty('--md-custom-color-custom-color1')
        })

        it("should have RGB variant properties for customColor", () => {
            expect(propertiesWithCustomColors).toHaveProperty('--md-custom-color-indian-red-rgb')
        })
    })

    /**
     * RGB Tests
     */
    describe("When rgbFromHex is called", () => {
        it("should return a string with the correct separator", () => {

            test(`given #00000 with ',' as separator, should return 0,0,0`, () => {
                expect(rgbFromHex('#000000', ',')).toEqual('0,0,0')
            })

            test(`given #00000 with ' ' as separator, should return 0 0 0`, () => {
                expect(rgbFromHex('#000000', ' ')).toEqual('0 0 0')
            })

            test(`given #00000 without separator argument, should return 0,0,0`, () => {
                expect(rgbFromHex('#000000')).toEqual('0,0,0')
            })
        })
    })


    describe('Properties have to contain all surface container color roles', () => {

        it('should have property with name of surface container', () => {
            expect(properties).toHaveProperty('--md-sys-color-surface-container')
        })

        it('should have property with name of surface container lowest', () => {
            expect(properties).toHaveProperty('--md-sys-color-surface-container-lowest')
        })

        it('should have property with name of surface container low', () => {
            expect(properties).toHaveProperty('--md-sys-color-surface-container-low')
        })

        it('should have property with name of surface container lowest', () => {
            expect(properties).toHaveProperty('--md-sys-color-surface-container-lowest')
        })

        it('should have property with name of surface container high', () => {
            expect(properties).toHaveProperty('--md-sys-color-surface-container-high')
        })

        it('should have property with name of surface container highest', () => {
            expect(properties).toHaveProperty('--md-sys-color-surface-container-highest')
        })

        // it('should have property with name of surface dim', () => {
        //     expect(properties).toHaveProperty('--md-sys-color-surface-dim')
        // })
        //
        // it('should have property with name of surface bright', () => {
        //     expect(properties).toHaveProperty('--md-sys-color-surface-bright')
        // })


    })
})



