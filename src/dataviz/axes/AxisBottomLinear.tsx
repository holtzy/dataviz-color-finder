import { useMemo } from "react";
import { ScaleLinear } from "d3";
import { DatavizTheme } from "../theme";

type AxisBottomProps = {
  xScale: ScaleLinear<number, number>;
  pixelsPerTick: number;
  height: number;
  datavizTheme: DatavizTheme;
};

export const AxisBottomLinear = ({
  xScale,
  pixelsPerTick,
  height,
  datavizTheme,
}: AxisBottomProps) => {
  const range = xScale.range();

  const ticks = useMemo(() => {
    const width = range[1] - range[0];
    const numberOfTicksTarget = Math.floor(width / pixelsPerTick);

    return xScale.ticks(numberOfTicksTarget).map((value) => ({
      value,
      xOffset: xScale(value),
    }));
  }, [xScale]);

  const offset = ticks.length > 0 ? ticks?.[1].value - ticks?.[0].value : 0;

  return (
    <>
      {ticks.map(({ value, xOffset }) => (
        <g
          key={value}
          transform={`translate(${xOffset}, 0)`}
          shapeRendering={"crispEdges"}
        >
          <line
            y1={0}
            y2={datavizTheme.tickLength}
            stroke="black"
            strokeWidth={0.5}
          />

          <text
            key={value}
            style={{
              fontSize: "10px",
              textAnchor: "middle",
              transform: "translateY(20px)",
              fill: "black",
            }}
          >
            {value}
          </text>

          <line y1={0} y2={-height} stroke={datavizTheme.gridColor} />
        </g>
      ))}

      {/* Secondary grid */}
      {datavizTheme.hasSecondaryGrid &&
        ticks.map(({ value, xOffset }) => (
          <g
            key={value}
            transform={`translate(${xOffset + offset}, 0)`}
            shapeRendering={"crispEdges"}
          >
            <line
              y1={0}
              y2={-height}
              stroke={datavizTheme.gridColor}
              strokeWidth={0.5}
            />
          </g>
        ))}
    </>
  );
};
