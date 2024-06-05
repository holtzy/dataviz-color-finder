import { useRef } from "react";
import { useDimensions } from "../use-dimensions";
import { FeatureCollection } from "geojson";
import { ChoroplethMap } from "./ChoroplethMap";

type ResponsiveChoroplethProps = {
  geoData: FeatureCollection;
  numData: { code: string; value: number }[];
  colorList: string[];
};

export const ResponsiveChoropleth = (props: ResponsiveChoroplethProps) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartSize = useDimensions(chartRef);

  return (
    <div style={{ height: "100%", width: "100%" }} ref={chartRef}>
      <ChoroplethMap
        {...props}
        width={chartSize.width}
        height={chartSize.height}
      />
    </div>
  );
};
