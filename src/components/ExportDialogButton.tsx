import { Button } from "./ui/button";
import { Download } from "lucide-react";
import { ColorPalette } from "@/data/color-palette-list";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CodeSnippet } from "./CodeSnippet";

export const ExportDialogButton = ({
  selectedColorObject,
  selectedLanguage,
}: {
  selectedColorObject: ColorPalette;
  selectedLanguage: "r" | "python";
}) => {
  const snippetPythonCode = `
from pypalettes import load_cmap
cmap = load_cmap("${selectedColorObject.name}")
`.trim();

  const colorArrayString = selectedColorObject.palette.join(", ");

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <Download />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="py-4 min-w-[600px]">
        <div>
          <div className="font-bold text-lg">Export this palette</div>
          <p>Choose your favorite way to export those colors.</p>
        </div>
        <div className="py-4 overflow-scroll">
          <div className="font-bold text-lg">Array of string:</div>
          <CodeSnippet code={colorArrayString} />

          <br />

          <div className="font-bold text-lg">Python code</div>
          <p className="mt-2">
            Note that you'll need to install the <code>pypalettes</code> library
            first.
          </p>
          <CodeSnippet code={snippetPythonCode} />

          <br />

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
