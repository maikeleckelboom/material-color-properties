"use strict";
exports.__esModule = true;
exports.contrastToken = exports.camelize = exports.humanize = exports.capitalize = exports.tokenize = exports.rgbFromHex = exports.hexAFromArgb = void 0;
var material_color_utilities_1 = require("@importantimport/material-color-utilities");
/**
 * Tokenizes a string by replacing any occurrences of camelCase with hyphen-separated words.
 *
 * @param {string} str The string to tokenize.
 * @returns {string} The tokenized string.
 */
var tokenize = function (str) { return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .toLowerCase(); };
exports.tokenize = tokenize;
/**
 * Capitalizes the first letter of a string.
 *
 * @param {string} str The string to capitalize.
 * @returns {string} The capitalized string.
 */
var capitalize = function (str) { return str
    .charAt(0)
    .toUpperCase() + str.slice(1); };
exports.capitalize = capitalize;
/**
 * Converts a camelCase or pascalCase string to human-readable form.
 *
 * @param {string} str The string to convert.
 * @returns {string} The humanized string.
 */
var humanize = function (str) { return str
    .replace(/([A-Z]|\d+)/g, ' $1')
    .replace(/^./, function (str) { return str.toUpperCase(); }); };
exports.humanize = humanize;
/**
 * Converts a hyphen-separated string into camelCase.
 *
 * @param {string} str The string to convert.
 * @returns {string} The converted string.
 */
var camelize = function (str) { return str
    .split('-')
    .map(function (word, index) { return index === 0 ? word : capitalize(word); })
    .join(''); };
exports.camelize = camelize;
/**
 * Generates a contrast token from a given key.
 *
 * @param {string} token The key to generate the contrast token from.
 * @param {Object} options An optional object that contains the prefix and suffix for the token.
 * @param {string} options.prefix The prefix to add to the token (default: 'md-sys-color-').
 * @param {string} options.suffix The suffix to add to the token (default: '').
 * @returns {string} The generated contrast token.
 */
function contrastToken(token, options) {
    if (options === void 0) { options = {}; }
    var _a = options.prefix, prefix = _a === void 0 ? 'md-sys-color-' : _a, _b = options.suffix, suffix = _b === void 0 ? '' : _b;
    var name = humanize(token).toLowerCase().split(' ');
    // Check if the token specifies a text color
    var isTextColor = name.includes('on');
    if (isTextColor) {
        name.splice(name.indexOf('on'), 1);
        return "".concat(prefix).concat(name.join('-')).concat(suffix);
    }
    // Check if the token specifies an inverse color
    var isInverseColor = name.includes('inverse');
    if (isInverseColor) {
        name.splice(name.indexOf('inverse'), 1);
        return "".concat(prefix).concat(name.join('-')).concat(suffix);
    }
    // If the token doesn't specify a text color
    // or an inverse color, use the default prefix
    return "".concat(prefix, "on-").concat(name.join('-')).concat(suffix);
}
exports.contrastToken = contrastToken;
/**
 * Converts a hexadecimal color code to an RGB color value.
 * @param hex - A string representing a hexadecimal color code (e.g. "#ff0000").
 * @returns A string representing the corresponding RGB color value (e.g. "255, 0, 0").
 */
var rgbFromHex = function (hex) {
    var _a, _b;
    // Use a regular expression to match two hexadecimal digits at a time
    // and convert each pair to a decimal integer using parseInt with radix 16
    var _c = (_b = (_a = hex.match(/\w\w/g)) === null || _a === void 0 ? void 0 : _a.map(function (x) { return parseInt(x, 16); })) !== null && _b !== void 0 ? _b : [0, 0, 0], r = _c[0], g = _c[1], b = _c[2];
    // Return the RGB color value as a comma-separated string
    return "".concat(r, ", ").concat(g, ", ").concat(b);
};
exports.rgbFromHex = rgbFromHex;
/**
 * Converts an integer color value and alpha value to a hexadecimal color code with alpha value.
 * @param value - An integer color value (e.g. 0xff0000 for red).
 * @param alpha - A number between 0 and 1 representing the alpha value.
 * @returns A string representing the corresponding hexadecimal color code with alpha value.
 */
var hexAFromArgb = function (value, alpha) {
    // Use hexFromArgb function to convert the integer color value to a hexadecimal color code
    var colorHex = (0, material_color_utilities_1.hexFromArgb)(value);
    // Multiply alpha value by 255 to get alpha value between 0 and 255,
    // round it to the nearest integer using Math.round, and convert to two-digit hexadecimal string
    var alphaHex = Math.round(alpha * 255).toString(16).padStart(2, '0');
    // Concatenate the hexadecimal color code and alpha value as a string and return it
    return "".concat(colorHex).concat(alphaHex);
};
exports.hexAFromArgb = hexAFromArgb;
