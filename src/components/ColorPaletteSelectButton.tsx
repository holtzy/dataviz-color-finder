import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ColorPalette, colorPaletteList } from "@/data/color-palette-list";
import { formatPaletteName } from "@/lib/utils";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { useMemo, useState } from "react";

type ColorPaletteSelectButtonProps = {
  filteredColorPaletteList: ColorPalette[];
  selectedPalette: string;
  setSelectedPalette: (newPalette: string) => void;
};

export const ColorPaletteSelectButton = ({
  filteredColorPaletteList,
  selectedPalette,
  setSelectedPalette,
}: ColorPaletteSelectButtonProps) => {
  // For perf reasons, I cannot display the 2500 palettes by default.
  // So I display only 100 of them, and then show a "Show more" button
  const [displayedNumber, setDisplayedNumber] = useState(100);
  const showMorePalette = () => {
    setDisplayedNumber(displayedNumber + 200);
  };

  const selectItemList = useMemo(() => {
    return filteredColorPaletteList.slice(0, displayedNumber).map((pal, i) => {
      return (
        <SelectItem value={String(i)} key={i}>
          <PalettePreview palette={pal} />
        </SelectItem>
      );
    });
  }, [displayedNumber, filteredColorPaletteList]);

  return (
    <Select
      onValueChange={(newPalette) => setSelectedPalette(newPalette)}
      value={selectedPalette}
    >
      <SelectTrigger className="w-[400px]">
        <SelectValue>
          <PalettePreview
            palette={
              colorPaletteList.find((c) => c.name === selectedPalette) ||
              colorPaletteList[0]
            }
          />
        </SelectValue>
      </SelectTrigger>

      <SelectContent>
        {selectItemList}
        <Separator className="my-2" />
        <Button size={"sm"} onClick={showMorePalette} className="my-2 ml-8">
          Show more
        </Button>
      </SelectContent>
    </Select>
  );
};

const PalettePreview = ({ palette }: { palette: ColorPalette }) => {
  return (
    <div className="flex gap-2">
      <span>{formatPaletteName(palette.name)}</span>
      <div className="flex flex-row" style={{ gap: 1 }}>
        {palette.palette.map((col, i) => {
          if (i > 18) {
            return null;
          }

          return (
            <div
              key={i}
              className="w-4 h-4 rounded-sm"
              style={{ backgroundColor: col }}
            />
          );
        })}
      </div>
    </div>
  );
};
