import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Download } from "lucide-react";
import { ColorPalette } from "@/data/color-palette-list";
import { getColorListFromString } from "@/lib/utils";

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
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Download />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] py-20">
        <DialogHeader>
          <DialogTitle>Export this palette</DialogTitle>
          <DialogDescription>
            Choose your favorite way to export those colors.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 overflow-scroll">
          <DialogTitle>Array of string:</DialogTitle>
          <div className="bg-gray-200 rounded-sm mt-2 p-4 text-xs">
            <pre>
              <code>
                {getColorListFromString(selectedColorObject.palette).map(
                  (col) => "'" + col + "', "
                )}
              </code>
            </pre>
          </div>

          <br />

          <DialogTitle>Python code</DialogTitle>
          <DialogDescription className="mt-2">
            Note that you'll need to install the <code>pypalettes</code> library
            first.
          </DialogDescription>
          <div className="bg-gray-200 rounded-sm mt-2 p-4 text-xs leading-6">
            <pre>
              <code>{snippetPythonCode}</code>
            </pre>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
