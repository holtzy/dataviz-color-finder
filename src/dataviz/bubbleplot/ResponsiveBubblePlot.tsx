import { useRef } from "react";
import { useDimensions } from "../use-dimensions";
import { BubblePlot } from "./BubblePlot";
import { DatavizTheme } from "../theme";

type ResponsiveBubblePlotProps = {
  data: {
    lifeExp: number;
    gdpPercap: number;
    continent: string;
    pop: number;
  }[];
  colorList: string[];
  datavizTheme: DatavizTheme;
};

export const ResponsiveBubblePlot = (props: ResponsiveBubblePlotProps) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartSize = useDimensions(chartRef);

  return (
    <div style={{ height: "100%", width: "100%" }} ref={chartRef}>
      <BubblePlot
        {...props}
        width={chartSize.width}
        height={chartSize.height}
      />
    </div>
  );
};
