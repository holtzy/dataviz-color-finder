export const getBarplotCode = (palette: string) => {

    const code = `
import matplotlib.pyplot as plt
import seaborn as sns
from pypalettes import load_cmap
import numpy as np

data = np.random.rand(10, 12)

cmap = load_cmap(${palette})

sns.heatmap(data, cmap=cmap)
plt.show()`.trim();

    return code
}
