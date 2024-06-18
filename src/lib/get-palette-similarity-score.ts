import Color from "colorjs.io"
import { mean } from "d3";

export const getPaletteSimilarityScore = (palette: string[], targetColor: string): number => {

    let targetCol = new Color(targetColor);

    const scores = palette.map(color => {
        const c = new Color(color)
        return targetCol.deltaE(c, "CMC")
    })

    const avgScore = (mean(scores) || 0) / scores.length

    return avgScore

}
