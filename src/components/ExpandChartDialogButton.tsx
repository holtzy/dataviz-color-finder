import { Button } from "./ui/button";
import { Expand } from "lucide-react";
import { ReactNode } from "react";
import { LOWER_OPACITY } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

type ExpandChartDialogButtonProps = {
  children: ReactNode;
  setAppOpacity: (opacity: number) => void;
};

export const ExpandChartDialogButton = ({
  children,
  setAppOpacity,
}: ExpandChartDialogButtonProps) => {
  return (
    <Popover onOpenChange={(open) => setAppOpacity(open ? LOWER_OPACITY : 1)}>
      <PopoverTrigger asChild>
        <Button>
          <Expand size={15} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="m-2 p-2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] shadow-2xl border border-black">
        {children}
      </PopoverContent>
    </Popover>
  );
};
