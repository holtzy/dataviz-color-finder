import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ColorPalette } from "@/data/color-palette-list";
import { formatPaletteName } from "@/lib/utils";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { useMemo } from "react";

type ColorPaletteSelectButtonProps = {
  paletteList: ColorPalette[];
  selectedPaletteId: number;
  setSelectedPaletteId: (newPalette: number) => void;
  showMorePalette: () => void;
};

export const ColorPaletteSelectButton = ({
  paletteList,
  selectedPaletteId,
  setSelectedPaletteId,
  showMorePalette,
}: ColorPaletteSelectButtonProps) => {
  const selectItemList = useMemo(() => {
    return paletteList.map((pal, i) => {
      return (
        <SelectItem value={String(i)} key={i}>
          <PalettePreview palette={pal} />
        </SelectItem>
      );
    });
  }, [paletteList]);

  return (
    <Select
      onValueChange={(newPalette) => setSelectedPaletteId(Number(newPalette))}
      value={paletteList[selectedPaletteId].name}
    >
      <SelectTrigger className="w-[400px]">
        <SelectValue>
          <PalettePreview palette={paletteList[selectedPaletteId]} />
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
              className="w-4 h-4 rounded-sm"
              style={{ backgroundColor: col }}
            />
          );
        })}
      </div>
    </div>
  );
};
