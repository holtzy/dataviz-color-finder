import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Code } from "lucide-react";
import { ColorPalette } from "@/data/color-palette-list";
import { ChartType } from "@/dataviz/types";
import { getBarplotCode } from "@/lib/get-chart-code-python";

type SeeCodeDialogButtonProps = {
  palette: ColorPalette;
  chartType: ChartType;
};

export const SeeCodeDialogButton = ({
  palette,
  chartType,
}: SeeCodeDialogButtonProps) => {
  // TODO: switch case for other chart type
  const code = getBarplotCode(palette.name);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Code size={15} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] py-20">
        <DialogHeader>
          <DialogTitle>Python code</DialogTitle>
          <DialogDescription>
            Copy paste this code to get the same chart at home!
          </DialogDescription>
        </DialogHeader>
        <div className="bg-gray-200 rounded-sm mt-2 p-4 text-xs">
          <pre>
            <code>{code}</code>
          </pre>
        </div>{" "}
      </DialogContent>
    </Dialog>
  );
};
