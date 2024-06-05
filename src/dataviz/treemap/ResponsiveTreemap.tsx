import { useRef } from "react";
import { useDimensions } from "../use-dimensions";
import { Treemap } from "./Treemap";
import { Tree } from "./data";

type ResponsiveTreemapProps = {
  data: Tree;
  colorList: string[];
};

export const ResponsiveTreemap = (props: ResponsiveTreemapProps) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartSize = useDimensions(chartRef);

  return (
    <div style={{ height: "100%", width: "100%" }} ref={chartRef}>
      <Treemap {...props} width={chartSize.width} height={chartSize.height} />
    </div>
  );
};
