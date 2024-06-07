import { Button } from "./ui/button";
import { Download, Filter } from "lucide-react";
import { ColorPalette, PaletteKind } from "@/data/color-palette-list";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";

type FilterDialogButtonProps = {
  enabledPaletteKinds: PaletteKind[];
  setEnabledPaletteKinds: (kinds: PaletteKind[]) => void;
};

export const FilterDialogButton = ({
  enabledPaletteKinds,
  setEnabledPaletteKinds,
}: FilterDialogButtonProps) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Filter />
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex items-center space-x-2">
          <Checkbox
            checked={enabledPaletteKinds.includes("qualitative")}
            id="terms"
            onCheckedChange={(isChecked) => {
              const newList: PaletteKind[] = isChecked
                ? [...enabledPaletteKinds, "qualitative"]
                : enabledPaletteKinds.filter((k) => k !== "qualitative");
              setEnabledPaletteKinds(newList);
            }}
          />
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
