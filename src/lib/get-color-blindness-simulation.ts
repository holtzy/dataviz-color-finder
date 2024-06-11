
/*Color.Vision.Simulate : v0.1
-----------------------------
Freely available for non-commercial use by Matthew Wickline and the
Human-Computer Interaction Resource Network ( http://hcirn.com/ ).

Found here: https://codepen.io/squints/pen/Vvqzoo

*/

export type ColorBlindnessType = "Protanopia" | "Deuteranopia" | "Tritanopia" | "Normal vision" | "Grey scale"
export const colorBlindnessTypes: ColorBlindnessType[] = ["Normal vision", "Protanopia", "Deuteranopia", "Tritanopia", "Grey scale"]

export type Mod = [number, number, number, number]

export const modP: Mod = [.7465, .2535, 1.273463, -0.073894]
export const modD: Mod = [1.4, -.04, .968437, .003331]
export const modT: Mod = [1.748, 0, .062921, .292119]

export function getColorBlindnessSimulation(hex: string, mod: Mod) {

    var r = parseInt(hex.replace("#", "").substring(0, 2), 16),
        g = parseInt(hex.replace("#", "").substring(2, 4), 16),
        b = parseInt(hex.replace("#", "").substring(4, 6), 16),
        confuseX = mod[0],
        confuseY = mod[1],
        confuseM = mod[2],
        confuseInt = mod[3],
        amount = 1;

    //convert to XYZ color space
    var powR = Math.pow(r, 2.2),
        powG = Math.pow(g, 2.2),
        powB = Math.pow(b, 2.2),
        X = powR * .412424 + powG * .357579 + powB * .180464,
        Y = powR * .212656 + powG * .715158 + powB * .072185,
        Z = powR * .019332 + powG * .119193 + powB * .950444;

    //convert XYZ to xyY
    var chromaX = X / (X + Y + Z),
        chromaY = Y / (X + Y + Z);

    //generate confusion line
    var slope = (chromaY - confuseY) / (chromaX - confuseX),
        int = chromaY - chromaX * slope;

    //calculate deviation
    var deviationX = (confuseInt - int) / (slope - confuseM),
        deviationY = (slope * deviationX) + int;

    //compute simulated color with confusion
    X = deviationX * Y / deviationY;
    Z = (1 - (deviationX + deviationY)) * Y / deviationY;

    //neutral grey
    var neutralX = .312713 * Y / .329016,
        neutralZ = .358271 * Y / .329016;

    //diff between color and grey
    var diffX = neutralX - X,
        diffZ = neutralZ - Z,
        diffR = diffX * 3.24071 + diffZ * -0.498571,
        diffG = diffX * -0.969258 + diffZ * .0415557,
        diffB = diffX * .0556352 + diffZ * 1.05707;

    //convert back to RBG
    var rgbR = X * 3.24071 + Y * -1.53726 + Z * -0.498571,
        rgbG = X * -0.969258 + Y * 1.87599 + Z * .0415557,
        rgbB = X * .0556352 + Y * -.203996 + Z * 1.05707;

    //compensate towards neutral
    var fitR = ((diffR < 0 ? 0 : 1) - rgbR) / diffR,
        fitG = ((diffG < 0 ? 0 : 1) - rgbG) / diffG,
        fitB = ((diffB < 0 ? 0 : 1) - rgbB) / diffB;

    let adjustInput = [
        (fitR > 1 || fitR < 0) ? 0 : fitR,
        (fitG > 1 || fitG < 0) ? 0 : fitG,
        (fitB > 1 || fitG < 0) ? 0 : fitB
    ];

    const adjust = Math.max.apply(null, adjustInput);

    //shift proportional to the greatest shift
    rgbR = rgbR + (adjust * diffR);
    rgbG = rgbG + (adjust * diffG);
    rgbB = rgbB + (adjust * diffB);

    //gamma correct
    rgbR = Math.pow(rgbR, 1 / 2.2);
    rgbG = Math.pow(rgbG, 1 / 2.2);
    rgbB = Math.pow(rgbB, 1 / 2.2);

    //back to hex
    let rString = Math.ceil(rgbR).toString(16);
    let gString = Math.ceil(rgbG).toString(16);
    let bString = Math.ceil(rgbB).toString(16);

    if (rString.length === 1) rString = '0' + rString;
    if (gString.length === 1) gString = '0' + gString;
    if (bString.length === 1) bString = '0' + bString;

    return "#" + rString + bString + gString;
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
