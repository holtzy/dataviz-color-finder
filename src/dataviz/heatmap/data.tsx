const nCol = 26;
const nRow = 26;

const alphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

type HeatmapData = { x: string; y: string; value: number }[];
let heatmapData: HeatmapData = [];

// Simple function to generate pseudo-random values with spatial continuity
function generateNoiseValue(x: number, y: number): number {
  const scale = 100; // Adjust the scale to change the "smoothness"
  return (
    (Math.sin(x / scale) + Math.sin(y / scale)) *
      Math.random() *
      Math.random() +
    0.05 * Math.random()
  ); // Range adjustment to [0, 40]
}

for (let x = 0; x < nCol; x++) {
  for (let y = 0; y < nRow; y++) {
    heatmapData.push({
      x: alphabet[x],
      y: alphabet[y],
      value: generateNoiseValue(x, y),
    });
  }
}

export { heatmapData };
