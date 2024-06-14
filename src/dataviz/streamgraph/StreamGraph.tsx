import { useMemo } from "react";
import * as d3 from "d3";
import { curveCatmullRom } from "d3";
import { DatavizTheme } from "../theme";
import { AxisBottomLinear } from "../axes/AxisBottomLinear";

const MARGIN = { top: 10, right: 10, bottom: 20, left: 20 };

type StreamGraphProps = {
  width: number;
  height: number;
  data: { [key: string]: number }[];
  colorList: string[];
  datavizTheme: DatavizTheme;
};

export const StreamGraph = ({
  width,
  height,
  data,
  colorList,
  datavizTheme,
}: StreamGraphProps) => {
  // bounds = area inside the graph axis = calculated by substracting the margins
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  //
  const groups = ["groupA", "groupB", "groupC", "groupD"];

  // Data Wrangling: stack the data
  const stackSeries = d3
    .stack()
    .keys(groups)
    .order(d3.stackOrderNone)
    .offset(d3.stackOffsetSilhouette);
  const series = stackSeries(data);

  // Y axis
  const yScale = useMemo(() => {
    return d3.scaleLinear().domain([-200, 200]).range([boundsHeight, 0]);
  }, [data, height]);

  // X axis
  const [xMin, xMax] = d3.extent(data, (d) => d.x);
  const xScale = useMemo(() => {
    return d3
      .scaleLinear()
      .domain([xMin || 0, xMax || 0])
      .range([0, boundsWidth]);
  }, [data, width]);

  // Color
  const colorScale = d3.scaleOrdinal<string>().domain(groups).range(colorList);

  // Build the shapes
  const areaBuilder = d3
    .area<any>()
    .x((d) => {
      return xScale(d.data.x);
    })
    .y1((d) => yScale(d[1]))
    .y0((d) => yScale(d[0]))
    .curve(curveCatmullRom);

  const allPath = series.map((serie, i) => {
    const path = areaBuilder(serie);
    return (
      <path
        key={i}
        d={path}
        opacity={1}
        stroke="grey"
        fill={colorScale(serie.key)}
        fillOpacity={0.8}
      />
    );
  });

  return (
    <div>
      <svg width={width} height={height}>
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
            stroke={datavizTheme.boundsRectColor}
            fill={datavizTheme.backgroundColor}
            strokeWidth={0.5}
            opacity={1}
          />
          <g transform={`translate(0, ${boundsHeight})`}>
            <AxisBottomLinear
              xScale={xScale}
              height={boundsHeight}
              pixelsPerTick={60}
              datavizTheme={datavizTheme}
            />
          </g>
          {allPath}
        </g>
      </svg>
    </div>
  );
};
