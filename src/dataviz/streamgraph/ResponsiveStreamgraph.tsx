import { useRef } from "react";
import { useDimensions } from "../use-dimensions";
import { StreamGraph } from "./StreamGraph";
import { DatavizTheme } from "../theme";

type ResponsiveStreamgraphProps = {
  data: { [key: string]: number }[];
  colorList: string[];
  datavizTheme: DatavizTheme;
};

export const ResponsiveStreamgraph = (props: ResponsiveStreamgraphProps) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartSize = useDimensions(chartRef);

  return (
    <div style={{ height: "100%", width: "100%" }} ref={chartRef}>
      <StreamGraph
        {...props}
        width={chartSize.width}
        height={chartSize.height}
      />
    </div>
  );
};
