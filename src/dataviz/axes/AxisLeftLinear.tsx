import { useMemo } from "react";
import { ScaleLinear } from "d3";
import { DatavizTheme } from "../theme";

type AxisLeftProps = {
  yScale: ScaleLinear<number, number>;
  datavizTheme: DatavizTheme;
  width: number;
  pixelsPerTick: number;
};

export const AxisLeftLinear = ({
  yScale,
  datavizTheme,
  width,
  pixelsPerTick,
}: AxisLeftProps) => {
  const range = yScale.range();
  console.log("range", range);
  const ticks = useMemo(() => {
    const height = range[0] - range[1];
    const numberOfTicksTarget = Math.floor(height / pixelsPerTick);

    return yScale.ticks(numberOfTicksTarget).map((value) => ({
      value,
      yOffset: yScale(value),
    }));
  }, [yScale]);

  console.log("y axis ticks", ticks);

  const offset =
    ticks.length > 0 ? (ticks?.[1].yOffset - ticks?.[0].yOffset) / 2 : 0;

  return (
    <>
      {/* Main vertical line */}
      <path
        d={["M", 0, range[0], "L", 0, range[1]].join(" ")}
        fill="none"
        stroke={datavizTheme.axisLineColor}
      />

      {/* Ticks + labels + grid */}
      {ticks.map(({ value, yOffset }) => (
        <g
          key={value}
          transform={`translate(0,${yOffset})`}
          shapeRendering={"crispEdges"}
        >
          <line
            x1={0}
            x2={-datavizTheme.tickLength}
            stroke="black"
            strokeWidth={0.5}
          />

          <text
            key={value}
            style={{
              fontSize: "10px",
              textAnchor: "end",
              dominantBaseline: "central",
              transform: "translateX(-6px)",
              fill: "black",
            }}
          >
            {value}
          </text>

          <line
            x1={0}
            x2={width}
            stroke={datavizTheme.gridColor}
            strokeWidth={1}
          />
        </g>
      ))}

      {/* Secondary grid */}
      {datavizTheme.hasSecondaryGrid &&
        ticks.map(({ value, yOffset }) => (
          <g
            key={value}
            transform={`translate(0, ${yOffset + offset})`}
            shapeRendering={"crispEdges"}
          >
            <line
              x1={0}
              x2={width}
              stroke={datavizTheme.gridColor}
              strokeWidth={0.5}
            />
          </g>
        ))}
    </>
  );
};
