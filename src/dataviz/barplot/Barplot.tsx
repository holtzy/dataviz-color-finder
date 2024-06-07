import { useMemo } from "react";
import * as d3 from "d3";
import { AxisLeftBand } from "../axes/AxisLeftBand";
import { AxisBottomLinear } from "../axes/AxisBottomLinear";

const MARGIN = { top: 10, right: 10, bottom: 20, left: 55 };
const BAR_PADDING = 0.2;

type BarplotProps = {
  width: number;
  height: number;
  data: { name: string; value: number }[];
  colorList: string[];
};

export const Barplot = ({ width, height, data, colorList }: BarplotProps) => {
  // bounds = area inside the graph axis = calculated by substracting the margins
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  // Y axis is for groups since the barplot is horizontal
  const groups = data.sort((a, b) => b.value - a.value).map((d) => d.name);
  const yScale = d3
    .scaleBand()
    .domain(groups)
    .range([0, boundsHeight])
    .padding(BAR_PADDING);

  // X axis
  const xScale = useMemo(() => {
    const [min, max] = d3.extent(data.map((d) => d.value));
    return d3
      .scaleLinear()
      .domain([0, max || 10])
      .range([0, boundsWidth - 20]);
  }, [data, width]);

  // Build the shapes
  const allShapes = data.map((d, i) => {
    const y = yScale(d.name);
    if (y === undefined) {
      return null;
    }

    return (
      <g key={i}>
        <rect
          x={xScale(0)}
          y={yScale(d.name)}
          width={xScale(d.value)}
          height={yScale.bandwidth()}
          opacity={1}
          stroke={"none"}
          fill={colorList[i] || "#f9fafb"}
          fillOpacity={0.9}
          rx={1}
          shapeRendering={"crispEdges"}
        />
      </g>
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
          <rect
            x={0}
            y={0}
            width={boundsWidth}
            height={boundsHeight}
            stroke="black"
            fill="transparent"
            strokeWidth={0.5}
          />
          <AxisLeftBand yScale={yScale} />
          <g transform={`translate(0, ${boundsHeight})`}>
            <AxisBottomLinear
              xScale={xScale}
              height={boundsHeight}
              pixelsPerTick={40}
            />
          </g>
          {allShapes}
        </g>
      </svg>
    </div>
  );
};
