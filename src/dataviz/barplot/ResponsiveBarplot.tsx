import { useRef } from "react";
import { Barplot } from "./Barplot";
import { useDimensions } from "../use-dimensions";
import { DatavizTheme } from "../theme";

type ResponsiveBarplotProps = {
  data: { name: string; value: number }[];
  colorList: string[];
  datavizTheme: DatavizTheme;
};

export const ResponsiveBarplot = (props: ResponsiveBarplotProps) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartSize = useDimensions(chartRef);

  return (
    <div style={{ height: "100%", width: "100%" }} ref={chartRef}>
      <Barplot {...props} width={chartSize.width} height={chartSize.height} />
    </div>
  );
};
