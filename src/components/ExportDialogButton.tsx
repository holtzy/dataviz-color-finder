import { Button } from "./ui/button";
import { Download } from "lucide-react";
import { ColorPalette } from "@/data/color-palette-list";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export const ExportDialogButton = ({
  selectedColorObject,
}: {
  selectedColorObject: ColorPalette;
}) => {
  const snippetPythonCode = `
from pypalettes import load_cmap
cmap = load_cmap("${selectedColorObject.name}")
`.trim();

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
          <div className="bg-gray-200 rounded-sm mt-2 p-4 text-xs">
            <pre>
              <code>
                {selectedColorObject.palette.map((col) => "'" + col + "', ")}
              </code>
            </pre>
          </div>

          <br />

          <div className="font-bold text-lg">Python code</div>
          <p className="mt-2">
            Note that you'll need to install the <code>pypalettes</code> library
            first.
          </p>
          <div className="bg-gray-200 rounded-sm mt-2 p-4 text-xs leading-6">
            <pre>
              <code>{snippetPythonCode}</code>
            </pre>
          </div>

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
