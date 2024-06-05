import { useRef } from "react";
import { Heatmap } from "./Heatmap";
import { useDimensions } from "../use-dimensions";

type ResponsiveHeatmapProps = {
  data: { x: string; y: string; value: number }[];
  colorList: string[];
};

export const ResponsiveHeatmap = (props: ResponsiveHeatmapProps) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartSize = useDimensions(chartRef);

  return (
    <div style={{ height: "100%", width: "100%" }} ref={chartRef}>
      <Heatmap {...props} width={chartSize.width} height={chartSize.height} />
    </div>
  );
};
