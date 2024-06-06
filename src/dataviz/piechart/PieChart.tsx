import { useMemo } from "react";
import * as d3 from "d3";

export type DataItem = {
  name: string;
  value: number;
};

type PieChartProps = {
  width: number;
  height: number;
  data: DataItem[];
  colorList: string[];
};

const MARGIN_X = 12;
const MARGIN_Y = 12;
const INFLEXION_PADDING = 0; // space between donut and label inflexion point

export const PieChart = ({ width, height, data, colorList }: PieChartProps) => {
  const radius = Math.min(width - 2 * MARGIN_X, height - 2 * MARGIN_Y) / 2;

  const pie = useMemo(() => {
    const pieGenerator = d3.pie<any, DataItem>().value((d) => d.value);
    return pieGenerator(data);
  }, [data]);

  const arcGenerator = d3.arc();

  const shapes = pie.map((grp, i) => {
    // First arc is for the pie
    const sliceInfo = {
      innerRadius: 0,
      outerRadius: radius,
      startAngle: grp.startAngle,
      endAngle: grp.endAngle,
    };
    const centroid = arcGenerator.centroid(sliceInfo);
    const slicePath = arcGenerator(sliceInfo);

    // Second arc is for the legend inflexion point
    const inflexionInfo = {
      innerRadius: radius + INFLEXION_PADDING,
      outerRadius: radius + INFLEXION_PADDING,
      startAngle: grp.startAngle,
      endAngle: grp.endAngle,
    };
    const inflexionPoint = arcGenerator.centroid(inflexionInfo);

    const isRightLabel = inflexionPoint[0] > 0;
    const isTopLabel = inflexionPoint[1] > 0;
    const labelPosX = inflexionPoint[0] + 5 * (isRightLabel ? 1 : -1);
    const labelPosY = inflexionPoint[1] + 8 * (isTopLabel ? 1 : -1);
    const textAnchor = isRightLabel ? "start" : "end";

    return (
      <g key={i}>
        <path d={slicePath} fill={colorList[i]} stroke="white" />
        <text
          x={labelPosX}
          y={labelPosY}
          textAnchor={textAnchor}
          dominantBaseline="middle"
          fontSize={11}
        >
          {grp.data.name}
        </text>
      </g>
    );
  });

  return (
    <svg width={width} height={height} style={{ display: "inline-block" }}>
      <g transform={`translate(${width / 2}, ${height / 2})`}>{shapes}</g>
    </svg>
  );
};
