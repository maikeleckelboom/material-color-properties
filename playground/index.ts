import {propertiesFromTheme} from "../src";
import {argbFromHex, Theme, themeFromSourceColor} from "@importantimport/material-color-utilities";

const sourceColor = "#15466e";

const theme: Theme = themeFromSourceColor(argbFromHex(sourceColor), []);

const properties = propertiesFromTheme(theme);

console.log(properties);
