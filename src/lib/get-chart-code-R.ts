export const getBarplotCode = (palette: string) => {

    const code = `
# load necessary libraries
library(ggplot2)
library(paletteer)

# load the data
data <- read.csv2("https://raw.githubusercontent.com/holtzy/The-Python-Graph-Gallery/master/static/data/simple-barplot.csv")
data$name <- factor(data$name, levels = rev(data$name))
data <- mutate(data, name = fct_reorder(name, value))

# create the bar plot
ggplot(data, aes(x = value, y = name, fill = name)) +
   geom_col() +
   scale_fill_paletteer_d("${palette}") +
   theme_minimal() +
   theme(
      axis.title.x = element_blank(),
      axis.title.y = element_blank(),
      legend.position = "none"
   )`.trim();

    return code
}

export const getHeatmapCode = (palette: string) => {

    const code = `
# load required libraries
library(ggplot2)
library(paletteer)
library(reshape2)

# create a sample matrix to simulate data
set.seed(123)
data_matrix <- matrix(runif(625, min = 0, max = 1), nrow = 25, ncol = 25)
rownames(data_matrix) <- rev(LETTERS[1:25])
colnames(data_matrix) <- LETTERS[1:25]

# melt the matrix to a long format
data_long <- melt(data_matrix)

# create the heatmap
ggplot(data_long, aes(x = Var2, y = Var1, fill = value)) +
   geom_tile() +
   scale_fill_paletteer_c("${palette}") +
   labs(x = NULL, y = NULL) +
   theme_minimal() +
   theme(
      axis.text.x = element_text(size = 12, angle = 0, hjust = 0.5),
      axis.text.y = element_text(size = 12, angle = 0, vjust = 0.5),
      panel.grid = element_blank(),
      legend.position = "none"
   )`.trim();

    return code
}

export const getPieChartCode = (palette: string) => {

    const code = `
# load necessary libraries
library(ggplot2)
library(paletteer)

# sample data
data <- read.csv2("https://raw.githubusercontent.com/holtzy/The-Python-Graph-Gallery/master/static/data/simple-piechart.csv")

# create the pie chart
ggplot(data, aes(x = "", y = value, fill = name)) +
   geom_bar(stat = "identity", width = 1) +
   coord_polar(theta = "y") +
   theme_void() +
   scale_fill_paletteer_d(${palette}) +
   theme(legend.position = "none") +
   labs(fill = "Category")`.trim();

    return code
}

export const getBubblePlotCode = (palette: string) => {

    const code = `
# load necessary libraries
library(ggplot2)
library(paletteer)

# load the data
df <- read.csv2("https://raw.githubusercontent.com/holtzy/The-Python-Graph-Gallery/master/static/data/simple-scatterplot.csv")

# create the bubble plot
ggplot(df, aes(x = gdpPercap, y = lifeExp, size = pop, color = continent)) +
   geom_point(size=10) +
   scale_color_paletteer_d("${palette}") +
   theme_minimal() +
   theme(legend.position = "none")`.trim();

    return code
}

export const getTreemapCode = (palette: string) => {

    const code = `
Not available yet.
WIP`.trim();

    return code
}

export const getChoroplethCode = (palette: string) => {

    const code = `
# load necessary libraries
library(sf)
library(ggplot2)

# Geospatial data available at the geojson format
tmp_geojson <- tempfile(fileext = ".geojson")
download.file(
   "https://raw.githubusercontent.com/holtzy/R-graph-gallery/DATA/world.geojson",
   tmp_geojson
)
my_sf <- read_sf(tmp_geojson)
my_sf <- my_sf[my_sf$name != "Antarctica", ] # remove antarctica
my_sf$random_value <- runif(nrow(my_sf)) # add numeric values

# create the choropleth
ggplot(my_sf) +
   geom_sf(aes(fill = random_value), color = "black", linewidth = 0.3) +
   theme_void() +
   theme(legend.position = "none") +
   scale_fill_paletteer_c("ggthemes::Classic Orange")
`.trim();

    return code
}

export const getStreamchartCode = (palette: string) => {

    const code = `
Not available yet.
WIP`.trim();

    return code
}
