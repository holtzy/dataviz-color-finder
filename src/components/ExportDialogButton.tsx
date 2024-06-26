import { Button } from "./ui/button";
import { Download } from "lucide-react";
import { ColorPalette } from "@/data/color-palette-list";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CodeSnippet } from "./CodeSnippet";
import { LOWER_OPACITY } from "@/lib/utils";
import { HorizontalSeparator } from "./HorizontalSeparator";

type ExportDialogButtonProps = {
  selectedColorObject: ColorPalette;
  selectedLanguage: "r" | "python";
  setAppOpacity: (opacity: number) => void;
};

export const ExportDialogButton = ({
  selectedColorObject,
  selectedLanguage,
  setAppOpacity,
}: ExportDialogButtonProps) => {
  const snippetPythonCode = `
from pypalettes import load_cmap
cmap = load_cmap("${selectedColorObject.name}")
`.trim();

  const pkg = selectedColorObject.source
    .replace("The R package: {", "")
    .replace("}", "");
  const completePaletteName = pkg + "::" + selectedColorObject.name;

  const snippetRCode = `
# install.packages("paletteer")
library(paletteer)

# Use in a ggplot2 chart:
scale_colour_paletteer_d("${completePaletteName}")
scale_fill_paletteer_d("${completePaletteName}")
`.trim();

  const colorArrayString = selectedColorObject.palette.join(", ");

  return (
    <Popover
      onOpenChange={(open) => {
        setAppOpacity(open ? LOWER_OPACITY : 1);
      }}
    >
      <PopoverTrigger asChild>
        <Button variant="outline">
          <Download />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="py-12 px-8 min-w-[600px] shadow-2xl border border-black">
        <div>
          <div className="font-bold text-xl">✉️ Export this palette</div>
          <p>Choose your favorite way to export those colors.</p>
        </div>

        <div className="my-6">
          <HorizontalSeparator />
        </div>

        <div className="overflow-scroll">
          <div className="font-bold text-lg">Array of string:</div>
          <CodeSnippet code={colorArrayString} />

          <div className="my-6">
            <HorizontalSeparator />
          </div>

          <div className="font-bold text-lg">
            {selectedLanguage === "python" ? "Python" : "R" + " code"}
          </div>
          <p className="mt-2">
            Note that you'll need to install the{" "}
            <code>
              {selectedLanguage === "python" ? "pypalettes" : "paletteer"}
            </code>{" "}
            library first.
          </p>
          <CodeSnippet
            code={
              selectedLanguage === "python" ? snippetPythonCode : snippetRCode
            }
          />

          <div className="my-6">
            <HorizontalSeparator />
          </div>

          <div className="font-bold text-lg">Individual Chart Code</div>
          <p className="mt-2">
            Hover any of the chart in this application to see a dedicated code
            button
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );
};
