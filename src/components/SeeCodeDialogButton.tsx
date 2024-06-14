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
import {
  getBarplotCodeR,
  getBubblePlotCodeR,
  getChoroplethCodeR,
  getHeatmapCodeR,
  getPieChartCodeR,
  getStreamchartCodeR,
  getTreemapCodeR,
} from "@/lib/get-chart-code-R";

type SeeCodeDialogButtonProps = {
  palette: ColorPalette;
  chartType: ChartType;
  selectedLanguage: "r" | "python";
};

export const SeeCodeDialogButton = ({
  palette,
  chartType,
  selectedLanguage,
}: SeeCodeDialogButtonProps) => {
  const pkg = palette.source.replace("The R package: {", "").replace("}", "");

  const completePaletteName = pkg + "::" + palette.name;

  let code = "";
  switch (chartType) {
    case "barplot":
      code =
        selectedLanguage === "r"
          ? getBarplotCodeR(completePaletteName)
          : getBarplotCode(palette.name);
      break;
    case "treemap":
      code =
        selectedLanguage === "r"
          ? getTreemapCodeR(completePaletteName)
          : getTreemapCode(palette.name);
      break;
    case "choropleth":
      code =
        selectedLanguage === "r"
          ? getChoroplethCodeR(completePaletteName)
          : getChoroplethCode(palette.name);
      break;
    case "bubble":
      code =
        selectedLanguage === "r"
          ? getBubblePlotCodeR(completePaletteName)
          : getBubblePlotCode(palette.name);
      break;
    case "streamgraph":
      code =
        selectedLanguage === "r"
          ? getStreamchartCodeR(completePaletteName)
          : getStreamchartCode(palette.name);
      break;
    case "heatmap":
      code =
        selectedLanguage === "r"
          ? getHeatmapCodeR(completePaletteName)
          : getHeatmapCode(palette.name);
      break;
    case "pie":
      code =
        selectedLanguage === "r"
          ? getPieChartCodeR(completePaletteName)
          : getPieChartCode(palette.name);
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
