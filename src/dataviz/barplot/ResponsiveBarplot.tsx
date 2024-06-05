import { useRef } from "react";
import { Barplot } from "./Barplot";
import { useDimensions } from "../use-dimensions";

type ResponsiveBarplotProps = {
  data: { name: string; value: number }[];
  colorList: string[];
};

export const ResponsiveBarplot = (props: ResponsiveBarplotProps) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartSize = useDimensions(chartRef);

  console.log("chartSize", chartSize);
  return (
    <div style={{ height: "100%", width: "100%" }} ref={chartRef}>
      <Barplot {...props} width={chartSize.width} height={chartSize.height} />
    </div>
  );
};
