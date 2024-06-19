// Matrixes taken from
// https://www.inf.ufrgs.br/~oliveira/pubs_files/CVD_Simulation/CVD_Simulation.html
/*
Gustavo M. Machado, Manuel M. Oliveira, and Leandro A. F. Fernandes
"A Physiologically-based Model for Simulation of Color Vision Deficiency".
IEEE Transactions on Visualization and Computer Graphics. Volume 15 (2009),
Number 6, November/December 2009. pp. 1291-1298.
*/
export type ColorBlindnessType = "Protanopia" | "Deuteranopia" | "Tritanopia" | "Normal vision" | "Grey scale"
export const colorBlindnessTypes: ColorBlindnessType[] = ["Normal vision", "Protanopia", "Deuteranopia", "Tritanopia", "Grey scale"]

// Utility function to convert a hex color to an RGB array in the range of 0-1
function hexToRgbNormalized(hex: string): [number, number, number] {

    // Remove the '#' at the start and parse the hexadecimal number
    const bigint = parseInt(hex.slice(1), 16);

    // Extract RGB and alpha components
    const r = (bigint >> 24) & 255;
    const g = (bigint >> 16) & 255;
    const b = (bigint >> 8) & 255;

    // Normalize RGB values to the range of 0-1
    const normalizedR = r / 255;
    const normalizedG = g / 255;
    const normalizedB = b / 255;

    return [normalizedR, normalizedG, normalizedB];
}

// Utility function to convert an RGB array to a hex color
function rgbToHex(rgb: [number, number, number]): string {
    const [r, g, b] = rgb.map((x) => {
        const xCorrected = x > 1 ? 1 : x // manual correction yan: sometimes the algo return a r or g or b value over 1, which breaks everything. This makes sure it's maximize to 1.
        const hex = Math.round(xCorrected * 255).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    });
    return `#${r}${g}${b}`;
}

var getMachadoMatrix = (function () {
    const machadoMatrixes = {
        'Protanomaly': new Float64Array([
            1.000000, 0.000000, -0.000000,
            0.000000, 1.000000, 0.000000,
            -0.000000, -0.000000, 1.000000,
            0.856167, 0.182038, -0.038205,
            0.029342, 0.955115, 0.015544,
            -0.002880, -0.001563, 1.004443,
            0.734766, 0.334872, -0.069637,
            0.051840, 0.919198, 0.028963,
            -0.004928, -0.004209, 1.009137,
            0.630323, 0.465641, -0.095964,
            0.069181, 0.890046, 0.040773,
            -0.006308, -0.007724, 1.014032,
            0.539009, 0.579343, -0.118352,
            0.082546, 0.866121, 0.051332,
            -0.007136, -0.011959, 1.019095,
            0.458064, 0.679578, -0.137642,
            0.092785, 0.846313, 0.060902,
            -0.007494, -0.016807, 1.024301,
            0.385450, 0.769005, -0.154455,
            0.100526, 0.829802, 0.069673,
            -0.007442, -0.022190, 1.029632,
            0.319627, 0.849633, -0.169261,
            0.106241, 0.815969, 0.077790,
            -0.007025, -0.028051, 1.035076,
            0.259411, 0.923008, -0.182420,
            0.110296, 0.804340, 0.085364,
            -0.006276, -0.034346, 1.040622,
            0.203876, 0.990338, -0.194214,
            0.112975, 0.794542, 0.092483,
            -0.005222, -0.041043, 1.046265,
            0.152286, 1.052583, -0.204868,
            0.114503, 0.786281, 0.099216,
            -0.003882, -0.048116, 1.051998,
        ]),
        'Deuteranomaly': new Float64Array([
            1.000000, 0.000000, -0.000000,
            0.000000, 1.000000, 0.000000,
            -0.000000, -0.000000, 1.000000,
            0.866435, 0.177704, -0.044139,
            0.049567, 0.939063, 0.011370,
            -0.003453, 0.007233, 0.996220,
            0.760729, 0.319078, -0.079807,
            0.090568, 0.889315, 0.020117,
            -0.006027, 0.013325, 0.992702,
            0.675425, 0.433850, -0.109275,
            0.125303, 0.847755, 0.026942,
            -0.007950, 0.018572, 0.989378,
            0.605511, 0.528560, -0.134071,
            0.155318, 0.812366, 0.032316,
            -0.009376, 0.023176, 0.986200,
            0.547494, 0.607765, -0.155259,
            0.181692, 0.781742, 0.036566,
            -0.010410, 0.027275, 0.983136,
            0.498864, 0.674741, -0.173604,
            0.205199, 0.754872, 0.039929,
            -0.011131, 0.030969, 0.980162,
            0.457771, 0.731899, -0.189670,
            0.226409, 0.731012, 0.042579,
            -0.011595, 0.034333, 0.977261,
            0.422823, 0.781057, -0.203881,
            0.245752, 0.709602, 0.044646,
            -0.011843, 0.037423, 0.974421,
            0.392952, 0.823610, -0.216562,
            0.263559, 0.690210, 0.046232,
            -0.011910, 0.040281, 0.971630,
            0.367322, 0.860646, -0.227968,
            0.280085, 0.672501, 0.047413,
            -0.011820, 0.042940, 0.968881]),
        'Tritanomaly': new Float64Array([
            1.000000, 0.000000, -0.000000,
            0.000000, 1.000000, 0.000000,
            -0.000000, -0.000000, 1.000000,
            0.926670, 0.092514, -0.019184,
            0.021191, 0.964503, 0.014306,
            0.008437, 0.054813, 0.936750,
            0.895720, 0.133330, -0.029050,
            0.029997, 0.945400, 0.024603,
            0.013027, 0.104707, 0.882266,
            0.905871, 0.127791, -0.033662,
            0.026856, 0.941251, 0.031893,
            0.013410, 0.148296, 0.838294,
            0.948035, 0.089490, -0.037526,
            0.014364, 0.946792, 0.038844,
            0.010853, 0.193991, 0.795156,
            1.017277, 0.027029, -0.044306,
            -0.006113, 0.958479, 0.047634,
            0.006379, 0.248708, 0.744913,
            1.104996, -0.046633, -0.058363,
            -0.032137, 0.971635, 0.060503,
            0.001336, 0.317922, 0.680742,
            1.193214, -0.109812, -0.083402,
            -0.058496, 0.979410, 0.079086,
            -0.002346, 0.403492, 0.598854,
            1.257728, -0.139648, -0.118081,
            -0.078003, 0.975409, 0.102594,
            -0.003316, 0.501214, 0.502102,
            1.278864, -0.125333, -0.153531,
            -0.084748, 0.957674, 0.127074,
            -0.000989, 0.601151, 0.399838,
            1.255528, -0.076749, -0.178779,
            -0.078411, 0.930809, 0.147602,
            0.004733, 0.691367, 0.303900]),
    };

    function getForSeverityStep(full: Float64Array, step: number) {
        if (step < 0 || step > 10) {
            throw "invalid step " + step
        }
        return full.subarray(step * 9, step * 9 + 9)
    }

    return function (type: "Protanomaly" | "Tritanomaly" | "Deuteranomaly") {

        const full = machadoMatrixes[type];
        var matrix = getForSeverityStep(full, 10)

        return function (rgb: [number, number, number]) {
            const r = rgb[0];
            const g = rgb[1];
            const b = rgb[2];
            const result: [number, number, number] = [
                matrix[0] * r + matrix[1] * g + matrix[2] * b,
                matrix[3] * r + matrix[4] * g + matrix[5] * b,
                matrix[6] * r + matrix[7] * g + matrix[8] * b,
            ];
            return result;
        };
    }
})()

export function clrProtan(hexColor: string): string {
    const rgb = hexToRgbNormalized(hexColor);
    const transform = getMachadoMatrix("Protanomaly")
    const rgbColor = transform(rgb)
    return (rgbToHex(rgbColor))
}

export function clrDeutan(hexColor: string): string {
    const rgb = hexToRgbNormalized(hexColor);
    const transform = getMachadoMatrix("Deuteranomaly")
    const rgbColor = transform(rgb)
    return (rgbToHex(rgbColor))
}

export function clrTritan(hexColor: string): string {
    const rgb = hexToRgbNormalized(hexColor);
    const transform = getMachadoMatrix("Tritanomaly")
    const rgbColor = transform(rgb)
    return (rgbToHex(rgbColor))
}

export function hexToGrayscale(hex: string) {
    // Remove the leading # if present
    hex = hex.replace(/^#/, '');

    // Parse the r, g, b values from the hex string
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    // Calculate the grayscale value using the luminance formula
    const grayscale = Math.round(0.299 * r + 0.587 * g + 0.114 * b);

    // Convert the grayscale value back to a hex string
    let grayscaleHex = grayscale.toString(16).padStart(2, '0');
    // Construct the grayscale hex color
    return `#${grayscaleHex}${grayscaleHex}${grayscaleHex}`;
}



// TEST 2: R code from Emil translated to JS
// DOes not work properly
// type Color = string;

// const protanMatrix = [
//     [0.152286, 1.052583, -0.204868],
//     [0.114503, 0.786281, 0.099216],
//     [-0.003882, -0.048116, 1.051998]
// ];

// const deutanMatrix = [
//     [0.367322, 0.860646, -0.227968],
//     [0.280085, 0.672501, 0.047413],
//     [-0.011820, 0.042940, 0.968881]
// ];

// const tritanMatrix = [
//     [1.255528, -0.076749, -0.178779],
//     [-0.078411, 0.930809, 0.147602],
//     [0.004733, 0.691367, 0.303900]
// ];

// function rangeCheck(x: number): void {
//     if (x < 0 || x > 1) {
//         throw new Error("`severity` must be between 0 and 1.");
//     }
// }

// function hexToRgb(hex: string): number[] {
//     const bigint = parseInt(hex.slice(1), 16);
//     return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
// }

// function rgbToHex(rgb: number[]): string {
//     return `#${((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2]).toString(16).slice(1).toUpperCase()}`;
// }

// function decodeColour(col: Color): number[] {
//     return hexToRgb(col);
// }

// function encodeColour(rgb: number[]): Color {
//     return rgbToHex(rgb);
// }

// function rgbNorm(rgb: number[]): number[] {
//     return rgb.map(value => Math.min(255, Math.max(0, value)));
// }

// function applyMatrix(rgb: number[], matrix: number[][], severity: number): number[] {
//     return matrix.map(row =>
//         row.reduce((sum, value, index) =>
//             sum + value * rgb[index], 0)
//     ).map(value => value * severity + rgb.map(v => v * (1 - severity)).reduce((a, b) => a + b));
// }

// export function clrProtan(col: Color, severity: number = 1): Color {
//     rangeCheck(severity);
//     const rgb = decodeColour(col);
//     const transformed = applyMatrix(rgb, protanMatrix, severity);
//     return encodeColour(rgbNorm(transformed));
// }

// export function clrDeutan(col: Color, severity: number = 1): Color {
//     rangeCheck(severity);
//     const rgb = decodeColour(col);
//     const transformed = applyMatrix(rgb, deutanMatrix, severity);
//     return encodeColour(rgbNorm(transformed));
// }

// export function clrTritan(col: Color, severity: number = 1): Color {
//     rangeCheck(severity);
//     const rgb = decodeColour(col);
//     const transformed = applyMatrix(rgb, tritanMatrix, severity);
//     return encodeColour(rgbNorm(transformed));
// }

// export type ColorBlindnessType = "Protanopia" | "Deuteranopia" | "Tritanopia" | "Normal vision" | "Grey scale"
// export const colorBlindnessTypes: ColorBlindnessType[] = ["Normal vision", "Protanopia", "Deuteranopia", "Tritanopia", "Grey scale"]



// TEST 1 : BUT PROBABLY WRONG

/*Color.Vision.Simulate : v0.1
-----------------------------
Freely available for non-commercial use by Matthew Wickline and the
Human-Computer Interaction Resource Network ( http://hcirn.com/ ).

Found here: https://codepen.io/squints/pen/Vvqzoo

*/

// export type ColorBlindnessType = "Protanopia" | "Deuteranopia" | "Tritanopia" | "Normal vision" | "Grey scale"
// export const colorBlindnessTypes: ColorBlindnessType[] = ["Normal vision", "Protanopia", "Deuteranopia", "Tritanopia", "Grey scale"]

// export type Mod = [number, number, number, number]

// export const modP: Mod = [.7465, .2535, 1.273463, -0.073894]
// export const modD: Mod = [1.4, -.04, .968437, .003331]
// export const modT: Mod = [1.748, 0, .062921, .292119]

// export function getColorBlindnessSimulation(hex: string, mod: Mod) {

//     var r = parseInt(hex.replace("#", "").substring(0, 2), 16),
//         g = parseInt(hex.replace("#", "").substring(2, 4), 16),
//         b = parseInt(hex.replace("#", "").substring(4, 6), 16),
//         confuseX = mod[0],
//         confuseY = mod[1],
//         confuseM = mod[2],
//         confuseInt = mod[3],
//         amount = 1;

//     //convert to XYZ color space
//     var powR = Math.pow(r, 2.2),
//         powG = Math.pow(g, 2.2),
//         powB = Math.pow(b, 2.2),
//         X = powR * .412424 + powG * .357579 + powB * .180464,
//         Y = powR * .212656 + powG * .715158 + powB * .072185,
//         Z = powR * .019332 + powG * .119193 + powB * .950444;

//     //convert XYZ to xyY
//     var chromaX = X / (X + Y + Z),
//         chromaY = Y / (X + Y + Z);

//     //generate confusion line
//     var slope = (chromaY - confuseY) / (chromaX - confuseX),
//         int = chromaY - chromaX * slope;

//     //calculate deviation
//     var deviationX = (confuseInt - int) / (slope - confuseM),
//         deviationY = (slope * deviationX) + int;

//     //compute simulated color with confusion
//     X = deviationX * Y / deviationY;
//     Z = (1 - (deviationX + deviationY)) * Y / deviationY;

//     //neutral grey
//     var neutralX = .312713 * Y / .329016,
//         neutralZ = .358271 * Y / .329016;

//     //diff between color and grey
//     var diffX = neutralX - X,
//         diffZ = neutralZ - Z,
//         diffR = diffX * 3.24071 + diffZ * -0.498571,
//         diffG = diffX * -0.969258 + diffZ * .0415557,
//         diffB = diffX * .0556352 + diffZ * 1.05707;

//     //convert back to RBG
//     var rgbR = X * 3.24071 + Y * -1.53726 + Z * -0.498571,
//         rgbG = X * -0.969258 + Y * 1.87599 + Z * .0415557,
//         rgbB = X * .0556352 + Y * -.203996 + Z * 1.05707;

//     //compensate towards neutral
//     var fitR = ((diffR < 0 ? 0 : 1) - rgbR) / diffR,
//         fitG = ((diffG < 0 ? 0 : 1) - rgbG) / diffG,
//         fitB = ((diffB < 0 ? 0 : 1) - rgbB) / diffB;

//     let adjustInput = [
//         (fitR > 1 || fitR < 0) ? 0 : fitR,
//         (fitG > 1 || fitG < 0) ? 0 : fitG,
//         (fitB > 1 || fitG < 0) ? 0 : fitB
//     ];

//     const adjust = Math.max.apply(null, adjustInput);

//     //shift proportional to the greatest shift
//     rgbR = rgbR + (adjust * diffR);
//     rgbG = rgbG + (adjust * diffG);
//     rgbB = rgbB + (adjust * diffB);

//     //gamma correct
//     rgbR = Math.pow(rgbR, 1 / 2.2);
//     rgbG = Math.pow(rgbG, 1 / 2.2);
//     rgbB = Math.pow(rgbB, 1 / 2.2);

//     //back to hex
//     let rString = Math.ceil(rgbR).toString(16);
//     let gString = Math.ceil(rgbG).toString(16);
//     let bString = Math.ceil(rgbB).toString(16);

//     if (rString.length === 1) rString = '0' + rString;
//     if (gString.length === 1) gString = '0' + gString;
//     if (bString.length === 1) bString = '0' + bString;

//     return "#" + rString + bString + gString;
// }


// export function hexToGrayscale(hex: string) {
//     // Remove the leading # if present
//     hex = hex.replace(/^#/, '');

//     // Parse the r, g, b values from the hex string
//     let r = parseInt(hex.substring(0, 2), 16);
//     let g = parseInt(hex.substring(2, 4), 16);
//     let b = parseInt(hex.substring(4, 6), 16);

//     // Calculate the grayscale value using the luminance formula
//     const grayscale = Math.round(0.299 * r + 0.587 * g + 0.114 * b);

//     // Convert the grayscale value back to a hex string
//     let grayscaleHex = grayscale.toString(16).padStart(2, '0');
//     // Construct the grayscale hex color
//     return `#${grayscaleHex}${grayscaleHex}${grayscaleHex}`;
// }
