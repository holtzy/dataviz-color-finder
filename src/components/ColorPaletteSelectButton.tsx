import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { colorPaletteList } from "@/data/color-palette-list";

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
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={selectedColorPalette} />
      </SelectTrigger>

      <SelectContent>
        {colorPaletteList.map((pal) => {
          return <SelectItem value={pal.name}>{pal.name}</SelectItem>;
        })}
      </SelectContent>
    </Select>
  );
};
