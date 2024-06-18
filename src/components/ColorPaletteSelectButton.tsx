"use client";

import { ColorPalette, colorPaletteList } from "@/data/color-palette-list";
import { formatPaletteName } from "@/lib/utils";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { useMemo, useState } from "react";

import * as React from "react";
import { ChevronsUpDown } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
  const [open, setOpen] = React.useState(false);

  // For perf reasons, I cannot display the 2500 palettes by default.
  // So I display only 100 of them, and then show a "Show more" button
  const [displayedNumber, setDisplayedNumber] = useState(100);
  const showMorePalette = () => {
    setDisplayedNumber(displayedNumber + 200);
  };

  const selectItemList = useMemo(() => {
    return filteredColorPaletteList.slice(0, displayedNumber).map((p, i) => {
      return (
        <CommandItem
          key={p.name}
          value={p.name}
          onSelect={(currentValue) => {
            setSelectedPalette(currentValue);
            setOpen(false);
          }}
        >
          <PalettePreview palette={p} />
        </CommandItem>
      );
    });
  }, [displayedNumber, filteredColorPaletteList]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[400px] justify-between"
        >
          {selectedPalette ? (
            <PalettePreview
              palette={
                colorPaletteList.find(
                  (c) => c.name.toLowerCase() === selectedPalette.toLowerCase()
                ) || colorPaletteList[0]
              }
            />
          ) : (
            "Select palette..."
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0">
        <Command>
          <CommandInput placeholder="Search palette..." />
          <CommandList>
            <CommandEmpty>No palette found.</CommandEmpty>
            <CommandGroup className="pl-1">{selectItemList}</CommandGroup>
            <Separator className="my-2" />
            <div className="flex items-center gap-4">
              <Button
                size={"sm"}
                onClick={showMorePalette}
                className="mt-4 mb-6 ml-3"
              >
                Show more
              </Button>
              <span className="text-xs text-gray-500 pb-2 italic">
                {"Only " +
                  displayedNumber +
                  " palettes loaded, click for more."}
              </span>
            </div>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export const PalettePreview = ({ palette }: { palette: ColorPalette }) => {
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
