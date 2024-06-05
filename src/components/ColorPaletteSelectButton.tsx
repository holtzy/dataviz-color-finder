import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ColorPalette } from "@/data/color-palette-list";
import { formatPaletteName, getColorListFromString } from "@/lib/utils";

type ColorPaletteSelectButtonProps = {
  paletteList: ColorPalette[];
  selectedPaletteId: number;
  setSelectedPaletteId: (newPalette: number) => void;
};

export const ColorPaletteSelectButton = ({
  paletteList,
  selectedPaletteId,
  setSelectedPaletteId,
}: ColorPaletteSelectButtonProps) => {
  return (
    <Select
      onValueChange={(newPalette) => setSelectedPaletteId(Number(newPalette))}
    >
      <SelectTrigger className="w-[400px]">
        <SelectValue>
          <PalettePreview palette={paletteList[selectedPaletteId]} />
        </SelectValue>
      </SelectTrigger>

      <SelectContent>
        {paletteList.map((pal, i) => {
          return (
            <SelectItem value={String(i)}>
              <PalettePreview palette={pal} />
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

const PalettePreview = ({ palette }: { palette: ColorPalette }) => {
  return (
    <div className="flex gap-2">
      <span>{formatPaletteName(palette.name)}</span>
      <div className="flex flex-row" style={{ gap: 1 }}>
        {getColorListFromString(palette.palette).map((col) => {
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
