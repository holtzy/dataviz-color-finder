import { Button } from "./ui/button";
import { Code } from "lucide-react";
import { ColorPalette } from "@/data/color-palette-list";
import { ChartType } from "@/dataviz/types";
import {
  getBarplotCode,
  getBubblePlotCode,
  getChoroplethCode,
  getHeatmapCode,
  getPieChartCode,
  getStreamchartCode,
  getTreemapCode,
} from "@/lib/get-chart-code-python";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

type SeeCodeDialogButtonProps = {
  palette: ColorPalette;
  chartType: ChartType;
};

export const SeeCodeDialogButton = ({
  palette,
  chartType,
}: SeeCodeDialogButtonProps) => {
  let code = "";
  switch (chartType) {
    case "barplot":
      code = getBarplotCode(palette.name);
      break;
    case "treemap":
      code = getTreemapCode(palette.name);
      break;
    case "choropleth":
      code = getChoroplethCode(palette.name);
      break;
    case "bubble":
      code = getBubblePlotCode(palette.name);
      break;
    case "streamgraph":
      code = getStreamchartCode(palette.name);
      break;
    case "heatmap":
      code = getHeatmapCode(palette.name);
      break;
    case "pie":
      code = getPieChartCode(palette.name);
      break;
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>
          <Code size={15} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="py-4 min-w-[600px]">
        <div>
          <p className="font-bold text-lg">Python code</p>
          <p className="text-sm">
            Copy paste this code to get the same chart at home!
          </p>
        </div>
        <div
          className="bg-gray-200 rounded-sm mt-2 p-4 text-xs"
          style={{ overflow: "scroll" }}
        >
          <pre>
            <code>{code}</code>
          </pre>
        </div>{" "}
      </PopoverContent>
    </Popover>
  );
};
