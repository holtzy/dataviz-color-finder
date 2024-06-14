import { Button, buttonVariants } from "./ui/button";
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
import { PalettePreview } from "./ColorPaletteSelectButton";

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

  // In R, paleteer does NOT allow to make a continuous graph with a qualitative palette.
  // For instance, not possible to make a heatmap from a red/yellow/green palette.
  // Show a warning in this case
  const isPaletteNotAllowed =
    selectedLanguage === "r" &&
    ["heatmap", "choropleth"].includes(chartType) &&
    palette.kind === "qualitative";

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

  const popoverContent = (
    <>
      <div>
        <p className="font-bold text-lg">
          {(selectedLanguage === "r" ? "R" : "Python") + " code"}
        </p>
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
      </div>
    </>
  );

  const popoverContentWarning = (
    <div className="px-8 py-8">
      <p className="font-bold text-lg">
        ⚠️ Palette not suitable for this chart
      </p>
      <hr className="max-w-96 mt-4" />
      <p className="mt-4">
        You're trying to use a <b>qualitative</b> palette on a graph that
        requires a <b>continuous</b> palette.
      </p>
      <div className="flex items-center gap-2 mt-2">
        <p>Look at your qualitative palette:</p>
        <div className="flex flex-row" style={{ gap: 1 }}>
          {palette.palette.map((col, i) => {
            if (i > 18) {
              return null;
            }

            return (
              <div
                key={i}
                className="w-4 h-4 rounded-sm"
                style={{ backgroundColor: col }}
              />
            );
          })}
        </div>
      </div>
      <p className="mt-2">
        How could you use this to encode a numeric variable? That would be
        unreadable 😔.
      </p>
      <hr className="max-w-96 mt-4" />
      <p className="mt-4">
        To prevent it,{" "}
        <a href="https://r-graph-gallery.com/package/paletteer.html">
          <u>paleteer</u>
        </a>{" "}
        does <b>not</b> allow it.
      </p>
      <p className="mt-2">
        <u>Pro-tip</u>: use the <b>filter</b> button to keep only continuous
        color palettes!
      </p>
      <hr className="max-w-96 mt-4" />

      <a
        href="https://r-graph-gallery.com/ggplot2-color.html"
        className={
          buttonVariants({ variant: "default", size: "sm" }) +
          " no-decoration mt-4"
        }
        target="_blank"
      >
        More about ggplot2 & colors
      </a>
    </div>
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>
          <Code size={15} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="py-4 min-w-[600px]">
        {isPaletteNotAllowed ? popoverContentWarning : popoverContent}
      </PopoverContent>
    </Popover>
  );
};
