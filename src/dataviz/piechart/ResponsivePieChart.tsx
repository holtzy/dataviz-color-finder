import { useRef } from "react";
import { DataItem, PieChart } from "./PieChart";
import { useDimensions } from "../use-dimensions";

type ResponsivePieChartProps = {
  data: DataItem[];
  colorList: string[];
};

export const ResponsivePieChart = (props: ResponsivePieChartProps) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartSize = useDimensions(chartRef);

  return (
    <div style={{ height: "100%", width: "100%" }} ref={chartRef}>
      <PieChart {...props} width={chartSize.width} height={chartSize.height} />
    </div>
  );
};
