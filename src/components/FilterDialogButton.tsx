import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Download, Filter } from "lucide-react";
import { ColorPalette } from "@/data/color-palette-list";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";

export const FilterDialogButton = ({
  selectedColorObject,
}: {
  selectedColorObject?: ColorPalette;
}) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Filter />
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex items-center space-x-2">
          <Checkbox checked={true} id="terms" />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Qualitative
          </label>
        </div>
      </PopoverContent>
    </Popover>
  );
};
