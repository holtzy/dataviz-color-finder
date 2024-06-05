import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { colorPaletteList } from "@/data/color-palette-list";
import { formatPaletteName, getColorListFromString } from "@/lib/utils";

type ColorPaletteSelectButtonProps = {
  selectedColorPalette: string;
  setSelectedColorPalette: (newPalette: string) => void;
};

export const ColorPaletteSelectButton = ({
  selectedColorPalette,
  setSelectedColorPalette,
}: ColorPaletteSelectButtonProps) => {
  return (
    <Select onValueChange={(newPalette) => setSelectedColorPalette(newPalette)}>
      <SelectTrigger className="w-[400px]">
        <SelectValue placeholder={selectedColorPalette} />
      </SelectTrigger>

      <SelectContent>
        {colorPaletteList.map((pal) => {
          return (
            <SelectItem value={pal.name}>
              <div className="flex gap-2">
                <span>{formatPaletteName(pal.name)}</span>
                <div className="flex flex-row" style={{ gap: 1 }}>
                  {getColorListFromString(pal.palette).map((col) => {
                    return (
                      <div
                        className="w-4 h-4 rounded-sm"
                        style={{ backgroundColor: col }}
                      />
                    );
                  })}
                </div>
              </div>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};
