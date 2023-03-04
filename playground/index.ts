import {propertiesFromTheme} from "../src";
import {argbFromHex, Theme, themeFromSourceColor} from "@material/material-color-utilities";

const theme: Theme = themeFromSourceColor(argbFromHex("#15466e"), [
    {
        name: "Arab Green",
        value: argbFromHex("#426230"),
        blend: true,
    },
    {
        name: "Cerulean",
        value: argbFromHex("#0077b6"),
        blend: true,
    }
]);

const properties = propertiesFromTheme(theme);

console.log(properties);

