import { useMemo } from "react";
import { ScaleLinear } from "d3";

type AxisBottomProps = {
  xScale: ScaleLinear<number, number>;
  pixelsPerTick: number;
  height: number;
};

const TICK_LENGTH = 5;

export const AxisBottomLinear = ({
  xScale,
  pixelsPerTick,
  height,
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

  return (
    <>
      {ticks.map(({ value, xOffset }) => (
        <g
          key={value}
          transform={`translate(${xOffset}, 0)`}
          shapeRendering={"crispEdges"}
        >
          <line y1={0} y2={TICK_LENGTH} stroke="black" strokeWidth={0.5} />
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
        </g>
      ))}
    </>
  );
};
