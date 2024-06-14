import { useMemo } from "react";
import * as d3 from "d3";
import { DatavizTheme } from "../theme";
import { AxisBottomLinear } from "../axes/AxisBottomLinear";
import { AxisLeftLinear } from "../axes/AxisLeftLinear";

const MARGIN = { top: 10, right: 10, bottom: 20, left: 30 };
const BUBBLE_MIN_SIZE = 4;
const BUBBLE_MAX_SIZE = 20;

type BubblePlotProps = {
  width: number;
  height: number;
  data: {
    lifeExp: number;
    gdpPercap: number;
    continent: string;
    pop: number;
  }[];
  colorList: string[];
  datavizTheme: DatavizTheme;
};

export const BubblePlot = ({
  width,
  height,
  data,
  colorList,
  datavizTheme,
}: BubblePlotProps) => {
  // Layout. The div size is set by the given props.
  // The bounds (=area inside the axis) is calculated by substracting the margins
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  // Scales
  const yScale = useMemo(() => {
    const [min, max] = d3.extent(data.map((d) => d.lifeExp)) as [
      number,
      number
    ];
    return d3
      .scaleLinear()
      .domain([datavizTheme.hasNumericAxisGap ? min - 4 : min, max])
      .range([boundsHeight, 0])
      .nice();
  }, [data, height]);

  const xScale = useMemo(() => {
    const [min, max] = d3.extent(data.map((d) => d.gdpPercap)) as [
      number,
      number
    ];
    return d3.scaleLinear().domain([-5000, max]).range([0, boundsWidth]).nice();
  }, [data, width]);

  const groups = data
    .map((d) => d.continent)
    .filter((x, i, a) => a.indexOf(x) == i);

  const colorScale = d3.scaleOrdinal<string>().domain(groups).range(colorList);

  const sizeScale = useMemo(() => {
    const [min, max] = d3.extent(data.map((d) => d.pop)) as [number, number];
    return d3
      .scaleSqrt()
      .domain([min, max])
      .range([BUBBLE_MIN_SIZE, BUBBLE_MAX_SIZE]);
  }, [data, width]);

  // Build the shapes
  const allShapes = data
    .sort((a, b) => b.pop - a.pop)
    .map((d, i) => {
      return (
        <circle
          key={i}
          r={sizeScale(d.pop)}
          cx={xScale(d.gdpPercap)}
          cy={yScale(d.lifeExp)}
          opacity={1}
          stroke={colorScale(d.continent)}
          fill={colorScale(d.continent)}
          fillOpacity={1}
          strokeWidth={1}
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
          <AxisLeftLinear
            yScale={yScale}
            width={boundsWidth}
            pixelsPerTick={60}
            datavizTheme={datavizTheme}
          />
          <g transform={`translate(0, ${boundsHeight})`}>
            <AxisBottomLinear
              xScale={xScale}
              height={boundsHeight}
              pixelsPerTick={80}
              datavizTheme={datavizTheme}
            />
          </g>
          {allShapes}
        </g>
      </svg>
    </div>
  );
};
