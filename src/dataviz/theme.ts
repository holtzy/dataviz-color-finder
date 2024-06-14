type DatavizTheme = {
    backgroundColor: string;
    gridColor: string;
}

const datavizThemes: ({ [key: string]: DatavizTheme }) = {
    matplotlib: {
        backgroundColor: "white",
        gridColor: "transparent"
    },
    ggplot2: {
        backgroundColor: "white",
        gridColor: "transparent"
    }
}
