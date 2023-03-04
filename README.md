# Material Color Properties

This package streamlines the process of accessing properties from the Material Design 3 theme.

[//]: # (## Note)

[//]: # (As of today, this package is only compatible with the `@material/material-color-utilities` package. In future this will change to be compatible with the original `@material/material-color-utilities` package from the Material Design team.)

## Quick Setup

1. Add `@webhead/material-color-properties` dependency to your project, also add `@material/material-color-utilities` if
   you haven't already.

```bash
# Using pnpm
pnpm add @material/material-color-utilities @webhead/material-color-properties

# Using yarn
yarn add @material/material-color-utilities @webhead/material-color-properties

# Using npm
npm install @material/material-color-utilities @webhead/material-color-properties
```

## Example

### Getting the theme via the `themeFromSourceColor` function

```ts
import {argbFromHex, CustomColor, Theme, themeFromSourceColor} from "@material/material-color-utilities";

const theme: Theme = themeFromSourceColor(argbFromHex('#ff0088'), [
    {
        name: 'Arab Green',
        value: '#22a45a',
        blend: true,
    }
])
```

### Getting the properties via the `propertiesFromTheme` function

```ts
import {propertiesFromTheme} from '@webhead/material-color-properties'

// Default options (optional)
const properties = propertiesFromTheme(theme, {
   tones: [0, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
   dark: false,
   brightnessSuffix: true,
   prefix: {
      palette: 'md-ref-palette-',
      color: 'md-sys-color-',
      customColor: 'md-custom-color-',
   }
}) 
```

### Example Output

```
{
    // Palette Primary
    "--md-ref-palette-primary0": "#000000",
    "--md-ref-palette-primary5": "#111111",
    "--md-ref-palette-primary10": "#1b1b1b",
    "--md-ref-palette-primary20": "#303030",
    "--md-ref-palette-primary30": "#474747",
    "--md-ref-palette-primary40": "#5e5e5e",
    "--md-ref-palette-primary50": "#777777",
    "--md-ref-palette-primary60": "#919191",
    "--md-ref-palette-primary70": "#ababab",
    "--md-ref-palette-primary80": "#c6c6c6",
    "--md-ref-palette-primary95": "#f1f1f1",
    "--md-ref-palette-primary99": "#fcfcfc",
    "--md-ref-palette-primary100": "#ffffff",
        
    // Palette Secondary
    "--md-ref-palette-secondary0": "#000000",
    "--md-ref-palette-secondary5": "#111111",
    "--md-ref-palette-secondary10": "#1b1b1b",
    "--md-ref-palette-secondary20": "#303030",
    "--md-ref-palette-secondary30": "#474747",
    "--md-ref-palette-secondary40": "#5e5e5e",
    "--md-ref-palette-secondary50": "#777777",
    "--md-ref-palette-secondary60": "#919191",
    "--md-ref-palette-secondary70": "#ababab",
    "--md-ref-palette-secondary80": "#c6c6c6",
    "--md-ref-palette-secondary95": "#f1f1f1",
    "--md-ref-palette-secondary99": "#fcfcfc",
    "--md-ref-palette-secondary100": "#ffffff",
        
    // Palette Tertiary
    "--md-ref-palette-tertiary0": "#000000",
    "--md-ref-palette-tertiary5": "#111111",
    "--md-ref-palette-tertiary10": "#1b1b1b",
    "--md-ref-palette-tertiary20": "#303030",
    "--md-ref-palette-tertiary30": "#474747",
    "--md-ref-palette-tertiary40": "#5e5e5e",
    "--md-ref-palette-tertiary50": "#777777",
    "--md-ref-palette-tertiary60": "#919191",
    "--md-ref-palette-tertiary70": "#ababab",
    "--md-ref-palette-tertiary80": "#c6c6c6",
    "--md-ref-palette-tertiary95": "#f1f1f1",
    "--md-ref-palette-tertiary99": "#fcfcfc",
    "--md-ref-palette-tertiary100": "#ffffff",
        
    // Palette Neutral
    "--md-ref-palette-neutral0": "#000000",
    "--md-ref-palette-neutral5": "#111111",
    "--md-ref-palette-neutral10": "#1b1b1b",
    "--md-ref-palette-neutral20": "#303030",
    "--md-ref-palette-neutral30": "#474747",
    "--md-ref-palette-neutral40": "#5e5e5e",
    "--md-ref-palette-neutral50": "#777777",
    "--md-ref-palette-neutral60": "#919191",
    "--md-ref-palette-neutral70": "#ababab",
    "--md-ref-palette-neutral80": "#c6c6c6",
    "--md-ref-palette-neutral95": "#f1f1f1",
    "--md-ref-palette-neutral99": "#fcfcfc",
    "--md-ref-palette-neutral100": "#ffffff",
        
    // Palette Neutral Variant
    "--md-ref-palette-neutral-variant0": "#000000",
    "--md-ref-palette-neutral-variant5": "#111111",
    "--md-ref-palette-neutral-variant10": "#1b1b1b",
    "--md-ref-palette-neutral-variant20": "#303030",
    "--md-ref-palette-neutral-variant30": "#474747",
    "--md-ref-palette-neutral-variant40": "#5e5e5e",
    "--md-ref-palette-neutral-variant50": "#777777",
    "--md-ref-palette-neutral-variant60": "#919191",
    "--md-ref-palette-neutral-variant70": "#ababab",
    "--md-ref-palette-neutral-variant80": "#c6c6c6",
    "--md-ref-palette-neutral-variant95": "#f1f1f1",
    "--md-ref-palette-neutral-variant99": "#fcfcfc",
    "--md-ref-palette-neutral-variant100": "#ffffff",
        
    // Palette Error
    "--md-ref-palette-error0": "#000000",
    "--md-ref-palette-error5": "#111111",
    "--md-ref-palette-error10": "#1b1b1b",
    "--md-ref-palette-error20": "#303030",
    "--md-ref-palette-error30": "#474747",
    "--md-ref-palette-error40": "#5e5e5e",
    "--md-ref-palette-error50": "#777777",
    "--md-ref-palette-error60": "#919191",
    "--md-ref-palette-error70": "#ababab",
    "--md-ref-palette-error80": "#c6c6c6",
    "--md-ref-palette-error95": "#f1f1f1",
    "--md-ref-palette-error99": "#fcfcfc",
    "--md-ref-palette-error100": "#ffffff",
   
    // Scheme
    "--md-sys-color-primary": "#ffb1c7",
    "--md-sys-color-on-primary": "#650032",
    "--md-sys-color-primary-container": "#8e0049",
    "--md-sys-color-on-primary-container": "#ffd9e2",
    "--md-sys-color-secondary": "#e3bdc6",
    "--md-sys-color-on-secondary": "#422931",
    "--md-sys-color-secondary-container": "#5b3f47",
    "--md-sys-color-on-secondary-container": "#ffd9e2",
    "--md-sys-color-tertiary": "#efbd93",
    "--md-sys-color-on-tertiary": "#47290b",
    "--md-sys-color-tertiary-container": "#613f1f",
    "--md-sys-color-on-tertiary-container": "#ffdcc1",
    "--md-sys-color-error": "#ffb4ab",
    "--md-sys-color-on-error": "#690005",
    "--md-sys-color-error-container": "#93000a",
    "--md-sys-color-on-error-container": "#ffdad6",
    "--md-sys-color-background": "#201a1b",
    "--md-sys-color-on-background": "#ece0e1",
    "--md-sys-color-surface": "#201a1b",
    "--md-sys-color-on-surface": "#ece0e1",
    "--md-sys-color-surface-variant": "#514346",
    "--md-sys-color-on-surface-variant": "#d5c2c5",
    "--md-sys-color-outline": "#9e8c90",
    "--md-sys-color-outline-variant": "#514346",
    "--md-sys-color-shadow": "#000000",
    "--md-sys-color-scrim": "#000000",
    "--md-sys-color-inverse-surface": "#ece0e1",
    "--md-sys-color-inverse-on-surface": "#352f30",
    "--md-sys-color-inverse-primary": "#ba0061",
   
    // Scheme Light
    "--md-sys-color-primary-light": "#ba0061",
    "--md-sys-color-on-primary-light": "#ffffff",
    "--md-sys-color-primary-container-light": "#ffd9e2",
    "--md-sys-color-on-primary-container-light": "#3e001d",
    "--md-sys-color-secondary-light": "#74565e",
    "--md-sys-color-on-secondary-light": "#ffffff",
    "--md-sys-color-secondary-container-light": "#ffd9e2",
    "--md-sys-color-on-secondary-container-light": "#2b151c",
    "--md-sys-color-tertiary-light": "#7c5635",
    "--md-sys-color-on-tertiary-light": "#ffffff",
    "--md-sys-color-tertiary-container-light": "#ffdcc1",
    "--md-sys-color-on-tertiary-container-light": "#2e1500",
    "--md-sys-color-error-light": "#ba1a1a",
    "--md-sys-color-on-error-light": "#ffffff",
    "--md-sys-color-error-container-light": "#ffdad6",
    "--md-sys-color-on-error-container-light": "#410002",
    "--md-sys-color-background-light": "#fffbff",
    "--md-sys-color-on-background-light": "#201a1b",
    "--md-sys-color-surface-light": "#fffbff",
    "--md-sys-color-on-surface-light": "#201a1b",
    "--md-sys-color-surface-variant-light": "#f2dde1",
    "--md-sys-color-on-surface-variant-light": "#514346",
    "--md-sys-color-outline-light": "#837376",
    "--md-sys-color-outline-variant-light": "#d5c2c5",
    "--md-sys-color-shadow-light": "#000000",
    "--md-sys-color-scrim-light": "#000000",
    "--md-sys-color-inverse-surface-light": "#352f30",
    "--md-sys-color-inverse-on-surface-light": "#faeeef",
    "--md-sys-color-inverse-primary-light": "#ffb1c7",
    
    // Scheme Dark
    "--md-sys-color-primary-dark": "#ba0061",
    "--md-sys-color-on-primary-dark": "#ffffff",
    "--md-sys-color-primary-container-dark": "#ffd9e2",
    "--md-sys-color-on-primary-container-dark": "#3e001d",
    "--md-sys-color-secondary-dark": "#74565e",
    "--md-sys-color-on-secondary-dark": "#ffffff",
    "--md-sys-color-secondary-container-dark": "#ffd9e2",
    "--md-sys-color-on-secondary-container-dark": "#2b151c",
    "--md-sys-color-tertiary-dark": "#7c5635",
    "--md-sys-color-on-tertiary-dark": "#ffffff",
    "--md-sys-color-tertiary-container-dark": "#ffdcc1",
    "--md-sys-color-on-tertiary-container-dark": "#2e1500",
    "--md-sys-color-error-dark": "#ba1a1a",
    "--md-sys-color-on-error-dark": "#ffffff",
    "--md-sys-color-error-container-dark": "#ffdad6",
    "--md-sys-color-on-error-container-dark": "#410002",
    "--md-sys-color-background-dark": "#fffbff",
    "--md-sys-color-on-background-dark": "#201a1b",
    "--md-sys-color-surface-dark": "#fffbff",
    "--md-sys-color-on-surface-dark": "#201a1b",
    "--md-sys-color-surface-variant-dark": "#f2dde1",
    "--md-sys-color-on-surface-variant-dark": "#514346",
    "--md-sys-color-outline-dark": "#837376",
    "--md-sys-color-outline-variant-dark": "#d5c2c5",
    "--md-sys-color-shadow-dark": "#000000",
    "--md-sys-color-scrim-dark": "#000000",
    "--md-sys-color-inverse-surface-dark": "#352f30",
    "--md-sys-color-inverse-on-surface-dark": "#faeeef",
    "--md-sys-color-inverse-primary-dark": "#ffb1c7",
   
    // Surface Level
    "--md-sys-color-surface-level0": "#ff008800",
    "--md-sys-color-surface-level1": "#ff00880d",
    "--md-sys-color-surface-level2": "#ff008814",
    "--md-sys-color-surface-level3": "#ff00881c",
    "--md-sys-color-surface-level4": "#ff00881f",
    "--md-sys-color-surface-level5": "#ff008824",
   
    // Surface Level Light
    "--md-sys-color-surface-level0-light": "#ff008800",
    "--md-sys-color-surface-level1-light": "#ff00880d",
    "--md-sys-color-surface-level2-light": "#ff008814",
    "--md-sys-color-surface-level3-light": "#ff00881c",
    "--md-sys-color-surface-level4-light": "#ff00881f",
    "--md-sys-color-surface-level5-light": "#ff008824",
    
    // Surface Level Dark
    "--md-sys-color-surface-level0-dark": "#ff008800",
    "--md-sys-color-surface-level1-dark": "#ff00880d",
    "--md-sys-color-surface-level2-dark": "#ff008814",
    "--md-sys-color-surface-level3-dark": "#ff00881c",
    "--md-sys-color-surface-level4-dark": "#ff00881f",
    "--md-sys-color-surface-level5-dark": "#ff008824",
    
    // Custom Color Palette
    "--md-ref-palette-arab-green0": "#000000",
    "--md-ref-palette-arab-green5": "#00150d",
    "--md-ref-palette-arab-green10": "#002116",
    "--md-ref-palette-arab-green20": "#003828",
    "--md-ref-palette-arab-green30": "#00513b",
    "--md-ref-palette-arab-green40": "#006c50",
    "--md-ref-palette-arab-green50": "#008865",
    "--md-ref-palette-arab-green60": "#05a47b",
    "--md-ref-palette-arab-green70": "#3cc095",
    "--md-ref-palette-arab-green80": "#5ddcaf",
    "--md-ref-palette-arab-green95": "#bcffe1",
    "--md-ref-palette-arab-green99": "#f4fff7",
    "--md-ref-palette-arab-green100": "#ffffff",
        
    // Custom Color Scheme
    "--md-custom-color-arab-green": "#8ed96d",
    "--md-custom-color-on-arab-green": "#0e3900",
    "--md-custom-color-arab-green-container": "#185200",
    "--md-custom-color-on-arab-green-container": "#a9f686",
        
    // Custom Color Scheme Light
    "--md-custom-color-arab-green-light": "#276c0a",
    "--md-custom-color-on-arab-green-light": "#ffffff",
    "--md-custom-color-arab-green-container-light": "#a9f686",
    "--md-custom-color-on-arab-green-container-light": "#052100",
   
    // Custom Color Scheme Dark   
    "--md-custom-color-arab-green-dark": "#276c0a",
    "--md-custom-color-on-arab-green-dark": "#ffffff",
    "--md-custom-color-arab-green-container-dark": "#a9f686",
    "--md-custom-color-on-arab-green-container-dark": "#052100",
     
    // Scheme RGB Values
    "--md-sys-color-primary-rgb": "255, 177, 199",
    "--md-sys-color-on-primary-rgb": "101, 0, 50",
    "--md-sys-color-primary-container-rgb": "142, 0, 73",
    "--md-sys-color-on-primary-container-rgb": "255, 217, 226",
    "--md-sys-color-secondary-rgb": "227, 189, 198",
    "--md-sys-color-on-secondary-rgb": "66, 41, 49",
    "--md-sys-color-secondary-container-rgb": "91, 63, 71",
    "--md-sys-color-on-secondary-container-rgb": "255, 217, 226",
    "--md-sys-color-tertiary-rgb": "239, 189, 147",
    "--md-sys-color-on-tertiary-rgb": "71, 41, 11",
    "--md-sys-color-tertiary-container-rgb": "97, 63, 31",
    "--md-sys-color-on-tertiary-container-rgb": "255, 220, 193",
    "--md-sys-color-error-rgb": "255, 180, 171",
    "--md-sys-color-on-error-rgb": "105, 0, 5",
    "--md-sys-color-error-container-rgb": "147, 0, 10",
    "--md-sys-color-on-error-container-rgb": "255, 218, 214",
    "--md-sys-color-background-rgb": "32, 26, 27",
    "--md-sys-color-on-background-rgb": "236, 224, 225",
    "--md-sys-color-surface-rgb": "32, 26, 27",
    "--md-sys-color-on-surface-rgb": "236, 224, 225",
    "--md-sys-color-surface-variant-rgb": "81, 67, 70",
    "--md-sys-color-on-surface-variant-rgb": "213, 194, 197",
    "--md-sys-color-outline-rgb": "158, 140, 144",
    "--md-sys-color-outline-variant-rgb": "81, 67, 70",
    "--md-sys-color-shadow-rgb": "0, 0, 0",
    "--md-sys-color-scrim-rgb": "0, 0, 0",
    "--md-sys-color-inverse-surface-rgb": "236, 224, 225",
    "--md-sys-color-inverse-on-surface-rgb": "53, 47, 48",
    "--md-sys-color-inverse-primary-rgb": "186, 0, 97",
        
    // Scheme Light RGB Values
    "--md-sys-color-primary-light-rgb": "186, 0, 97",
    "--md-sys-color-on-primary-light-rgb": "255, 255, 255",
    "--md-sys-color-primary-container-light-rgb": "255, 217, 226",
    "--md-sys-color-on-primary-container-light-rgb": "62, 0, 29",
    "--md-sys-color-secondary-light-rgb": "116, 86, 94",
    "--md-sys-color-on-secondary-light-rgb": "255, 255, 255",
    "--md-sys-color-secondary-container-light-rgb": "255, 217, 226",
    "--md-sys-color-on-secondary-container-light-rgb": "43, 21, 28",
    "--md-sys-color-tertiary-light-rgb": "124, 86, 53",
    "--md-sys-color-on-tertiary-light-rgb": "255, 255, 255",
    "--md-sys-color-tertiary-container-light-rgb": "255, 220, 193",
    "--md-sys-color-on-tertiary-container-light-rgb": "46, 21, 0",
    "--md-sys-color-error-light-rgb": "186, 26, 26",
    "--md-sys-color-on-error-light-rgb": "255, 255, 255",
    "--md-sys-color-error-container-light-rgb": "255, 218, 214",
    "--md-sys-color-on-error-container-light-rgb": "65, 0, 2",
    "--md-sys-color-background-light-rgb": "255, 251, 255",
    "--md-sys-color-on-background-light-rgb": "32, 26, 27",
    "--md-sys-color-surface-light-rgb": "255, 251, 255",
    "--md-sys-color-on-surface-light-rgb": "32, 26, 27",
    "--md-sys-color-surface-variant-light-rgb": "242, 221, 225",
    "--md-sys-color-on-surface-variant-light-rgb": "81, 67, 70",
    "--md-sys-color-outline-light-rgb": "131, 115, 118",
    "--md-sys-color-outline-variant-light-rgb": "213, 194, 197",
    "--md-sys-color-shadow-light-rgb": "0, 0, 0",
    "--md-sys-color-scrim-light-rgb": "0, 0, 0",
    "--md-sys-color-inverse-surface-light-rgb": "53, 47, 48",
    "--md-sys-color-inverse-on-surface-light-rgb": "250, 238, 239",
    "--md-sys-color-inverse-primary-light-rgb": "255, 177, 199",
        
    // Scheme Dark RGB Values
    "--md-sys-color-primary-dark-rgb": "255, 177, 199",
    "--md-sys-color-on-primary-dark-rgb": "101, 0, 50",
    "--md-sys-color-primary-container-dark-rgb": "142, 0, 73",
    "--md-sys-color-on-primary-container-dark-rgb": "255, 217, 226",
    "--md-sys-color-secondary-dark-rgb": "227, 189, 198",
    "--md-sys-color-on-secondary-dark-rgb": "66, 41, 49",
    "--md-sys-color-secondary-container-dark-rgb": "91, 63, 71",
    "--md-sys-color-on-secondary-container-dark-rgb": "255, 217, 226",
    "--md-sys-color-tertiary-dark-rgb": "239, 189, 147",
    "--md-sys-color-on-tertiary-dark-rgb": "71, 41, 11",
    "--md-sys-color-tertiary-container-dark-rgb": "97, 63, 31",
    "--md-sys-color-on-tertiary-container-dark-rgb": "255, 220, 193",
    "--md-sys-color-error-dark-rgb": "255, 180, 171",
    "--md-sys-color-on-error-dark-rgb": "105, 0, 5",
    "--md-sys-color-error-container-dark-rgb": "147, 0, 10",
    "--md-sys-color-on-error-container-dark-rgb": "255, 218, 214",
    "--md-sys-color-background-dark-rgb": "32, 26, 27",
    "--md-sys-color-on-background-dark-rgb": "236, 224, 225",
    "--md-sys-color-surface-dark-rgb": "32, 26, 27",
    "--md-sys-color-on-surface-dark-rgb": "236, 224, 225",
    "--md-sys-color-surface-variant-dark-rgb": "81, 67, 70",
    "--md-sys-color-on-surface-variant-dark-rgb": "213, 194, 197",
    "--md-sys-color-outline-dark-rgb": "158, 140, 144",
    "--md-sys-color-outline-variant-dark-rgb": "81, 67, 70",
    "--md-sys-color-shadow-dark-rgb": "0, 0, 0",
    "--md-sys-color-scrim-dark-rgb": "0, 0, 0",
    "--md-sys-color-inverse-surface-dark-rgb": "236, 224, 225",
    "--md-sys-color-inverse-on-surface-dark-rgb": "53, 47, 48",
    "--md-sys-color-inverse-primary-dark-rgb": "186, 0, 97",
        
    // Custom Color RGB Values
    "--md-custom-color-arab-green-rgb": "142, 217, 109",
    "--md-custom-color-on-arab-green-rgb": "14, 57, 0",
    "--md-custom-color-arab-green-container-rgb": "24, 82, 0",
    "--md-custom-color-on-arab-green-container-rgb": "169, 246, 134",
    "--md-custom-color-arab-green-light-rgb": "39, 108, 10",
    "--md-custom-color-on-arab-green-light-rgb": "255, 255, 255",
    "--md-custom-color-arab-green-container-light-rgb": "169, 246, 134",
    "--md-custom-color-on-arab-green-container-light-rgb": "5, 33, 0",
    "--md-custom-color-arab-green-dark-rgb": "39, 108, 10",
    "--md-custom-color-on-arab-green-dark-rgb": "255, 255, 255",
    "--md-custom-color-arab-green-container-dark-rgb": "169, 246, 134",
    "--md-custom-color-on-arab-green-container-dark-rgb": "5, 33, 0"
}
```
