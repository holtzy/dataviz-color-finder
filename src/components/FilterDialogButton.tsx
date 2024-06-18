import { Button } from "./ui/button";
import { Filter } from "lucide-react";
import { PaletteKind } from "@/data/color-palette-list";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { LOWER_OPACITY } from "@/lib/utils";
import { HorizontalSeparator } from "./HorizontalSeparator";
import { ChromePicker, ColorResult } from "react-color";
import { useState } from "react";

type FilterDialogButtonProps = {
  enabledPaletteKinds: PaletteKind[];
  setEnabledPaletteKinds: (kinds: PaletteKind[]) => void;
  enabledPaletteLength: number[];
  setEnabledPaletteLength: (list: number[]) => void;
  remainingPaletteNumber: number;
  setAppOpacity: (opacity: number) => void;
  selectedColorTarget: string | undefined;
  setSelectedColorTarget: (col: string | undefined) => void;
};

export const FilterDialogButton = ({
  enabledPaletteKinds,
  setEnabledPaletteKinds,
  enabledPaletteLength,
  setEnabledPaletteLength,
  remainingPaletteNumber,
  setAppOpacity,
  selectedColorTarget,
  setSelectedColorTarget,
}: FilterDialogButtonProps) => {
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);

  const [selectedColor, setSelectedColor] = useState(selectedColorTarget);

  // Debounce the heavy operation for 500ms
  const debouncedHandleColorChange = debounce((color: string) => {
    setSelectedColorTarget(color);
  }, 500);

  const handleColorChange = (col: ColorResult) => {
    setSelectedColor(col.hex);
    debouncedHandleColorChange(col.hex); // Trigger the debounced function
  };

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
    <Popover onOpenChange={(open) => setAppOpacity(open ? LOWER_OPACITY : 1)}>
      <PopoverTrigger style={{ height: 40 }}>
        <Button variant="outline">
          <Filter />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="py-12 px-8  shadow-2xl border border-black">
        <p className="font-bold text-lg">Add filters</p>
        <p className="text-sm text-gray-400">
          {remainingPaletteNumber + " palettes remaining"}
        </p>

        <div className="my-4">
          <HorizontalSeparator />
        </div>

        <p className="text-sm font-bold">Palette types 🎨 </p>
        <div className="ml-6">
          {getCheckboxPaletteKind("qualitative")}
          {getCheckboxPaletteKind("sequential")}
          {getCheckboxPaletteKind("diverging")}
        </div>

        <div className="my-4">
          <HorizontalSeparator />
        </div>

        <p className="text-sm font-bold">Palette length ↔️ </p>
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

        <div className="my-4">
          <HorizontalSeparator />
        </div>

        <p className="text-sm font-bold">Color target 🎯 </p>
        {!selectedColorTarget && (
          <Button onClick={() => setIsColorPickerOpen(true)} className="my-2">
            Pick Color
          </Button>
        )}
        {selectedColorTarget && (
          <Button
            style={{ backgroundColor: selectedColorTarget }}
            onClick={() => {
              setSelectedColorTarget(undefined);
              setIsColorPickerOpen(false);
            }}
            className="my-2"
          >
            Remove Filter
          </Button>
        )}

        {isColorPickerOpen ? (
          <div>
            <div onClick={() => setIsColorPickerOpen(false)} />
            <ChromePicker color={selectedColor} onChange={handleColorChange} />
          </div>
        ) : null}
      </PopoverContent>
    </Popover>
  );
};

// Debounce function
const debounce = <F extends (...args: any[]) => void>(
  func: F,
  delay: number
) => {
  let timer: NodeJS.Timeout;
  return function (this: any, ...args: Parameters<F>) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};
