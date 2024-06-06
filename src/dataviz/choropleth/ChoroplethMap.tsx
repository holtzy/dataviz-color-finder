import * as d3 from "d3";
import { FeatureCollection } from "geojson";

const CENTER: [number, number] = [30, 65]; // The geographic center of your map

type ChoroplethMapProps = {
  width: number;
  height: number;
  geoData: FeatureCollection;
  numData: { code: string; value: number }[];
  colorList: string[];
};

export const ChoroplethMap = ({
  width,
  height,
  geoData,
  numData,
  colorList,
}: ChoroplethMapProps) => {
  const colorScale = d3
    .scaleThreshold<number, string>()
    .domain([100000, 1000000, 10000000, 30000000, 100000000, 500000000])
    .range(colorList);

  const projection = d3
    .geoMercator()
    .center(CENTER)
    .scale(0.5) // Start with a scale of 1
    .translate([0, 0]); // Start with no translation

  // Create a path generator with the initial projection
  const path = d3.geoPath().projection(projection);

  // Compute the bounds of a feature or the entire map (if you have a specific feature to fit, use that instead)
  const bounds = path.bounds(geoData); // geoData is your GeoJSON data

  // Calculate the scale and translation
  const scale =
    0.95 /
    Math.max(
      (bounds[1][0] - bounds[0][0]) / width,
      (bounds[1][1] - bounds[0][1]) / height
    );

  const translate: [number, number] = [
    (width - scale * (bounds[1][0] + bounds[0][0])) / 2,
    (height - scale * (bounds[1][1] + bounds[0][1])) / 2,
  ];

  // Update the projection with the new scale and translation
  projection.scale(scale).translate(translate);

  // Recreate the path generator with the updated projection
  const geoPathGenerator = d3.geoPath().projection(projection);

  const allSvgPaths = geoData.features
    .filter((shape) => shape.id !== "ATA")
    .map((shape) => {
      const regionData = numData.find((region) => region.code === shape.id);

      const color = regionData ? colorScale(regionData?.value) : "lightgrey";

      return (
        <path
          key={shape.id}
          d={geoPathGenerator(shape)}
          stroke="lightGrey"
          strokeWidth={0.5}
          fill={color}
          fillOpacity={1}
        />
      );
    });

  return (
    <div>
      <svg width={width} height={height}>
        {allSvgPaths}
      </svg>
    </div>
  );
};
