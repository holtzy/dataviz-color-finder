import { useMemo } from "react";
import { ScaleBand } from "d3";
import { DatavizTheme } from "../theme";

type AxisLeftProps = {
  yScale: ScaleBand<string>;
  datavizTheme: DatavizTheme;
  width: number;
};

export const AxisLeftBand = ({
  yScale,
  datavizTheme,
  width,
}: AxisLeftProps) => {
  const [min, max] = yScale.range();

  const ticks = useMemo(() => {
    return yScale.domain().map((value) => ({
      value,
      yOffset: yScale(value) + yScale.bandwidth() / 2,
    }));
  }, [yScale]);

  return (
    <>
      {/* Main vertical line */}
      <path
        d={["M", 0, min, "L", 0, max].join(" ")}
        fill="none"
        stroke={datavizTheme.axisLineColor}
      />

      {/* Ticks + labels + grid */}
      {ticks.map(({ value, yOffset }) => (
        <g key={value} transform={`translate(0, ${yOffset})`}>
          <line x2={-datavizTheme.tickLength} stroke="currentColor" />

          <text
            key={value}
            style={{
              fontSize: "10px",
              textAnchor: "end",
              alignmentBaseline: "middle",
              transform: "translateX(-10px)",
            }}
          >
            {value}
          </text>

          <line x2={width} stroke={datavizTheme.gridColor} />
        </g>
      ))}
    </>
  );
};
