import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  ColorBlindnessType,
  colorBlindnessTypes,
} from "@/lib/get-color-blindness-simulation";
import { Separator } from "./ui/separator";

type ColorBlindnessSelectButtonProps = {
  selectedColorBlindness: ColorBlindnessType;
  setSelectedColorBlindness: (blindness: ColorBlindnessType) => void;
};

export const ColorBlindnessSelectButton = ({
  selectedColorBlindness,
  setSelectedColorBlindness,
}: ColorBlindnessSelectButtonProps) => {
  const selectItemList = colorBlindnessTypes.map((c, i) => {
    return (
      <div key={i}>
        <SelectItem value={c}>{c}</SelectItem>
        {(i === 0 || i === 3) && <Separator />}
      </div>
    );
  });

  return (
    <Select
      onValueChange={(newBlindness: ColorBlindnessType) =>
        setSelectedColorBlindness(newBlindness)
      }
      value={selectedColorBlindness}
    >
      <SelectTrigger className="w-[150px]">
        <SelectValue>{selectedColorBlindness}</SelectValue>
      </SelectTrigger>

      <SelectContent>{selectItemList}</SelectContent>
    </Select>
  );
};
