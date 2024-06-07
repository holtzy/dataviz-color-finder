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
  enabledPaletteLength: number[];
  setEnabledPaletteLength: (list: number[]) => void;
  remainingPaletteNumber: number;
};

export const FilterDialogButton = ({
  enabledPaletteKinds,
  setEnabledPaletteKinds,
  enabledPaletteLength,
  setEnabledPaletteLength,
  remainingPaletteNumber,
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
            if (newList.length === 0) {
              return;
            }
            setEnabledPaletteKinds(newList);
          }}
        />
        <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {type}
        </span>
      </div>
    );
  };

  const getCheckboxPaletteLength = (
    paletteLength: number,
    orientation: "top" | "bottom"
  ) => {
    const num = (
      <span className="text-xs font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {paletteLength}
      </span>
    );
    return (
      <div className="flex flex-col items-center space-y-1 my-3">
        {orientation === "top" && num}
        <Checkbox
          checked={enabledPaletteLength.includes(paletteLength)}
          id="terms"
          onCheckedChange={(isChecked) => {
            const newList = isChecked
              ? [...enabledPaletteLength, paletteLength]
              : enabledPaletteLength.filter((l) => l !== paletteLength);
            if (newList.length === 0) {
              return;
            }
            setEnabledPaletteLength(newList);
          }}
        />
        {orientation === "bottom" && num}
      </div>
    );
  };

  return (
    <Popover>
      <PopoverTrigger style={{ height: 40 }}>
        <Button variant="outline">
          <Filter />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <p className="font-bold text-lg">Add filters</p>
        <p className="text-sm text-gray-400">
          {remainingPaletteNumber + " palettes remaining"}
        </p>
        <p className="mt-8 text-sm font-bold">Palette types 🎨 </p>
        <div className="ml-6">
          {getCheckboxPaletteKind("qualitative")}
          {getCheckboxPaletteKind("sequential")}
          {getCheckboxPaletteKind("diverging")}
        </div>
        <p className="mt-8 text-sm font-bold">Palette length ↔️ </p>
        <div className="ml-6">
          <div className="flex flex-row gap-3">
            {[1, 2, 3, 4, 5, 6, 7].map((num) => {
              return (
                <div key={num}>{getCheckboxPaletteLength(num, "top")}</div>
              );
            })}
          </div>
          <div className="flex flex-row gap-3 -mt-4">
            {[8, 9, 10, 11, 12, 13, 14].map((num) => {
              return (
                <div key={num}>{getCheckboxPaletteLength(num, "bottom")}</div>
              );
            })}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
