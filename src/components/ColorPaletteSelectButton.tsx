import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { colorPaletteList } from "@/data/color-palette-list";

type ColorPaletteSelectButtonProps = {
  colorPalette: string;
  setColorPalette: (newPalette: string) => void;
};

export const ColorPaletteSelectButton = ({
  colorPalette,
  setColorPalette,
}: ColorPaletteSelectButtonProps) => {
  return (
    <Select onValueChange={(newPalette) => setColorPalette(newPalette)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={colorPalette} />
      </SelectTrigger>

      <SelectContent>
        {colorPaletteList.map((pal) => {
          return <SelectItem value={pal.name}>{pal.name}</SelectItem>;
        })}
      </SelectContent>
    </Select>
  );
};
