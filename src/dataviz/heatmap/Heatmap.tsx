import { useMemo } from "react";
import * as d3 from "d3";

const MARGIN = { top: 25, right: 25, bottom: 25, left: 25 };

type HeatmapProps = {
  width: number;
  height: number;
  data: { x: string; y: string; value: number }[];
  colorList: string[];
};

export const Heatmap = ({ width, height, data, colorList }: HeatmapProps) => {
  // bounds = area inside the axis
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  // groups
  const allYGroups = useMemo(() => [...new Set(data.map((d) => d.y))], [data]);
  const allXGroups = useMemo(() => [...new Set(data.map((d) => d.x))], [data]);

  // x and y scales
  const xScale = useMemo(() => {
    return d3.scaleBand().range([0, boundsWidth]).domain(allXGroups).padding(0);
  }, [data, width]);

  const yScale = useMemo(() => {
    return d3
      .scaleBand()
      .range([boundsHeight, 0])
      .domain(allYGroups)
      .padding(0.0);
  }, [data, height]);

  const [min, max] = d3.extent(data.map((d) => d.value));

  if (!min || !max) {
    return null;
  }

  // Create the domain dynamically based on the number of colors
  const colorCount = colorList.length;
  const domain = Array.from(
    { length: colorCount },
    (_, i) => min + (i * (max - min)) / (colorCount - 1)
  );

  // Create a color scale
  const colorScale = d3
    .scaleLinear<string>()
    .domain(domain)
    .range(colorList)
    .interpolate(d3.interpolateRgb);

  // Build the rectangles
  const allRects = data.map((d, i) => {
    return (
      <rect
        key={i}
        r={4}
        x={xScale(d.x)}
        y={yScale(d.y)}
        width={xScale.bandwidth()}
        height={yScale.bandwidth()}
        opacity={1}
        fill={colorScale(d.value)}
        rx={0}
        stroke={"none"}
      />
    );
  });

  const xLabels = allXGroups.map((name, i) => {
    const xPos = xScale(name) ?? 0;
    return (
      <text
        key={i}
        x={xPos + xScale.bandwidth() / 2}
        y={boundsHeight + 10}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={10}
      >
        {name}
      </text>
    );
  });

  const yLabels = allYGroups.map((name, i) => {
    const yPos = yScale(name) ?? 0;
    return (
      <text
        key={i}
        x={-5}
        y={yPos + yScale.bandwidth() / 2}
        textAnchor="end"
        dominantBaseline="middle"
        fontSize={10}
      >
        {name}
      </text>
    );
  });

  return (
    <div>
      <svg width={width} height={height} shapeRendering={"crispEdges"}>
        <g
          width={boundsWidth}
          height={boundsHeight}
          transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
        >
          {allRects}
          {xLabels}
          {yLabels}
        </g>
      </svg>
    </div>
  );
};

/**
 * Generates an array of n values between min and max with equal spacing.
 *
 * @param min - The minimum value.
 * @param max - The maximum value.
 * @param n - The number of values to generate.
 * @returns An array of n values between min and max.
 */
function generateEqualSpacing(min: number, max: number, n: number): number[] {
  const values: number[] = [];
  const step = (max - min) / (n - 1);
  for (let i = 0; i < n; i++) {
    values.push(min + i * step);
  }
  return values;
}
