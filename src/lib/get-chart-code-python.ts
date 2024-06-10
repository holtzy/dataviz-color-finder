export const getBarplotCode = (palette: string) => {

    const code = `
# load libraries
import pandas as pd
import matplotlib.pyplot as plt
from pypalettes import load_cmap

# create dataset
df = pd.read_csv("https://raw.githubusercontent.com/holtzy/The-Python-Graph-Gallery/master/static/data/simple-barplot.csv")

# create a color palette
cmap = load_cmap('${palette}')

# create a bar plot
fig, ax = plt.subplots(figsize=(8,8), dpi=300)
ax.barh(df["name"], df["value"], color=[cmap(i) for i in range(len(df))][::-1])
plt.show()`.trim();

    return code
}

export const getHeatmapCode = (palette: string) => {

    const code = `
# load libraries
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from pypalettes import load_cmap

df = pd.read_csv("https://raw.githubusercontent.com/holtzy/The-Python-Graph-Gallery/master/static/data/simple-heatmap.csv")
df.drop('Unnamed: 0', axis=1, inplace=True)

# create a color palette
cmap = load_cmap('${palette}', type='continuous')

# create a bar plot
fig, ax = plt.subplots(figsize=(11,8), dpi=300)
sns.heatmap(df, cmap=cmap, ax=ax, cbar=False)
plt.show()`.trim();

    return code
}

export const getPieChartCode = (palette: string) => {

    const code = `
# load libraries
import pandas as pd
import matplotlib.pyplot as plt
from pypalettes import load_cmap

df = pd.read_csv("https://raw.githubusercontent.com/holtzy/The-Python-Graph-Gallery/master/static/data/simple-piechart.csv")

# create a color palette
cmap = load_cmap('${palette}')

# create a bar plot
fig, ax = plt.subplots(figsize=(11,8), dpi=300)
ax.pie(df["value"], labels=df["name"], colors=[cmap(i) for i in range(len(df))])
plt.show()`.trim();

    return code
}

export const getBubblePlotCode = (palette: string) => {

    const code = `
# load libraries
import pandas as pd
import matplotlib.pyplot as plt
from pypalettes import load_cmap
import seaborn as sns

# load the gapminder dataset
df = pd.read_csv("https://raw.githubusercontent.com/holtzy/The-Python-Graph-Gallery/master/static/data/simple-scatterplot.csv")

# create a color palette
cmap = load_cmap('${palette}')
unique_hues = df['continent'].unique()
palette = [cmap(i / len(unique_hues)) for i in range(len(unique_hues))]

# create a bar plot
fig, ax = plt.subplots(figsize=(11, 8), dpi=300)
ax.spines[['top', 'right']].set_visible(False)
sns.scatterplot(
   data=df,
   x="gdpPercap",
   y="lifeExp",
   size="pop",
   hue="continent",
   edgecolor=None,
   palette=palette,
   sizes=(400, 4000),
   legend=False,
   ax=ax
)
ax.set_ylabel('')
ax.set_xlabel('')
ax.set_yticks([i for i in range(35, 90, 5)])
ax.set_yticklabels([str(i) for i in range(35, 90, 5)])
ax.set_xticks([i for i in range(0, 60000, 10000)])
ax.set_xticklabels([str(i) for i in range(0, 60000, 10000)])
plt.show()`.trim();

    return code
}

export const getTreemapCode = (palette: string) => {

    const code = `
# load libraries
import squarify # pip install squarify (algorithm for treemap)
import matplotlib.pyplot as plt
from pypalettes import load_cmap
import pandas as pd

df = pd.read_csv("https://raw.githubusercontent.com/holtzy/The-Python-Graph-Gallery/master/static/data/simple-treemap.csv")

# create a color palette
cmap = load_cmap('${palette}')
category_codes, unique_categories = pd.factorize(df['parent'])
colors = [cmap(code / (len(unique_categories) - 1)) for code in category_codes]

# create a bar plot
fig, ax = plt.subplots(figsize=(11,8), dpi=300)
ax.set_axis_off()
squarify.plot(
   sizes=df["value"],
   label=df["name"],
   color=colors,
   text_kwargs={'color':'white'},
   pad=True,
   ax=ax
)
plt.show()`.trim();

    return code
}

export const getChoroplethCode = (palette: string) => {

    const code = `
# load libraries
import geopandas as gpd
import matplotlib.pyplot as plt
from pypalettes import load_cmap

# load the world dataset
df = gpd.read_file('https://raw.githubusercontent.com/JosephBARBIERDARNAL/The-Python-Graph-Gallery/master/static/data/world.geojson')

# create a color palette
cmap = load_cmap('${palette}', type='continuous')

fig, ax = plt.subplots(figsize=(10, 10), dpi=300)
ax.set_axis_off()
df.plot(ax=ax, cmap=cmap, edgecolor='white', linewidth=0.3)
plt.show()`.trim();

    return code
}

export const getStreamchartCode = (palette: string) => {

    const code = `
import matplotlib.pyplot as plt
from pypalettes import load_cmap
import pandas as pd

df = pd.read_csv("https://raw.githubusercontent.com/holtzy/The-Python-Graph-Gallery/master/static/data/simple-streamchart.csv")
x = df['x']
groupA = df['groupA']
groupB = df['groupB']
groupC = df['groupC']
groupD = df['groupD']

# # create a color palette
cmap = load_cmap('${palette}')
colors = [cmap(i / len(df.columns)) for i in range(len(df.columns))]

fig, ax = plt.subplots(figsize=(10, 10), dpi=300)
ax.stackplot(
   x, groupA, groupB, groupC, groupD,
   labels=['groupA', 'groupB', 'groupC', 'groupD'],
   colors=colors,
   edgecolor='grey',
   linewidth=1,
   baseline='wiggle'
)

for i in range(2, 12, 2):
    ax.axvline(i, color='grey', linewidth=0.5, alpha=0.5)
ax.set_xlim(1.2, 10)
ax.tick_params(axis='x', colors='grey', labelsize=14)
ax.spines[['left', 'right', 'top', 'bottom']].set_visible(False)
ax.set_yticks([])
plt.show()`.trim();

    return code
}