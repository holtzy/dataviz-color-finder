export type DatavizTheme = {
    backgroundColor: string;
    gridColor: string;
    hasSecondaryGrid: boolean;
    boundsRectColor: string;
    axisLineColor: string;
    hasNumericAxisGap: boolean;
    tickLength: number
}

export const matplotlibTheme: DatavizTheme = {
    backgroundColor: "white",
    gridColor: "transparent",
    boundsRectColor: "black",
    axisLineColor: "black",
    hasNumericAxisGap: false,
    tickLength: 5,
    hasSecondaryGrid: false
}

export const ggplot2Theme: DatavizTheme = {
    backgroundColor: "#ebebeb",
    gridColor: "#fdfdfd",
    boundsRectColor: "transparent",
    axisLineColor: "transparent",
    hasNumericAxisGap: true,
    tickLength: 2,
    hasSecondaryGrid: true
}

