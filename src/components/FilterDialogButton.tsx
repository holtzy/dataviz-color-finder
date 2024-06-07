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
  const getCheckboxPaletteKind = (type: PaletteKind) => {
    return (
      <div className="flex items-center space-x-2 my-3">
        <Checkbox
          checked={enabledPaletteKinds.includes(type)}
          id="terms"
          onCheckedChange={(isChecked) => {
            const newList: PaletteKind[] = isChecked
              ? [...enabledPaletteKinds, type]
              : enabledPaletteKinds.filter((k) => k !== type);
            setEnabledPaletteKinds(newList);
          }}
        />
        <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {type}
        </span>
      </div>
    );
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Filter />
      </PopoverTrigger>
      <PopoverContent>
        {getCheckboxPaletteKind("qualitative")}
        {getCheckboxPaletteKind("sequential")}
        {getCheckboxPaletteKind("diverging")}
      </PopoverContent>
    </Popover>
  );
};
