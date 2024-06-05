import { Expand } from "lucide-react";
import { ReactElement } from "react";
import { Button } from "./ui/button";
import { SeeCodeDialogButton } from "./SeeCodeDialogButton";
import { ChartType } from "@/dataviz/types";
import { ColorPalette } from "@/data/color-palette-list";
import { ExpandChartDialogButton } from "./ExpandChartDialogButton";

type GraphTileProps = {
  children: ReactElement;
  chartType: ChartType;
  palette: ColorPalette;
};

export const GraphTile = ({ children, chartType, palette }: GraphTileProps) => {
  return (
    <div className="group relative w-full h-full border border-gray-100 hover:border-black p-4 rounded-sm ">
      <div className="w-full h-full group-hover:opacity-50">{children}</div>
      <div className="absolute top-0 right-0 m-2  gap-2 hidden group-hover:flex">
        <ExpandChartDialogButton>{children}</ExpandChartDialogButton>
        <SeeCodeDialogButton chartType={chartType} palette={palette} />
      </div>
    </div>
  );
};