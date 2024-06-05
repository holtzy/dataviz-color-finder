"use client";

import { ColorPaletteSelectButton } from "@/components/ColorPaletteSelectButton";
import { ExportDialogButton } from "@/components/ExportDialogButton";
import { GraphTile } from "@/components/GraphTile";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { colorPaletteList } from "@/data/color-palette-list";
import { Barplot } from "@/dataviz/barplot/Barplot";
import { ResponsiveBarplot } from "@/dataviz/barplot/ResponsiveBarplot";
import { barplotData } from "@/dataviz/barplot/data";
import { ChoroplethMap } from "@/dataviz/choropleth/ChoroplethMap";
import { geoData, numData } from "@/dataviz/choropleth/data";
import { Heatmap } from "@/dataviz/heatmap/Heatmap";
import { heatmapData } from "@/dataviz/heatmap/data";
import { PieChart } from "@/dataviz/piechart/PieChart";
import { pieData } from "@/dataviz/piechart/data";
import { Treemap } from "@/dataviz/treemap/Treemap";
import { treemapData } from "@/dataviz/treemap/data";
import { getColorListFromString } from "@/lib/utils";
import { ArrowLeft, ArrowRight, Download, Filter } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const [selectedPaletteId, setSelectedPaletteId] = useState(0);

  const selectedColorObject = colorPaletteList[selectedPaletteId];
  const selectedColorList = getColorListFromString(selectedColorObject.palette);

  const switchToPreviousPalette = () => {
    const newId =
      selectedPaletteId - 1 < 0
        ? colorPaletteList.length - 1
        : selectedPaletteId - 1;
    setSelectedPaletteId(newId);
  };

  const switchToNextPalette = () => {
    const newId =
      selectedPaletteId + 2 > colorPaletteList.length
        ? 0
        : selectedPaletteId + 1;
    setSelectedPaletteId(newId);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        switchToNextPalette();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [switchToNextPalette]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        switchToPreviousPalette();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [switchToPreviousPalette]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex gap-6 items-top">
        <Button variant={"outline"}>
          <Filter />
        </Button>

        <div className="flex flex-col">
          <ColorPaletteSelectButton
            paletteList={colorPaletteList}
            selectedPaletteId={selectedPaletteId}
            setSelectedPaletteId={setSelectedPaletteId}
          />
          <div className="flex gap-2 pt-2 text-xs text-gray-500">
            <span>Source: </span>
            <span>{selectedColorObject.source}</span>
            <Separator orientation="vertical" />
            <span>{selectedColorList.length + " colors"}</span>
            <Separator orientation="vertical" />
            <span>Continuous</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant={"outline"} onClick={switchToPreviousPalette}>
            <ArrowLeft size={15} />
          </Button>
          <Button variant={"outline"} onClick={switchToNextPalette}>
            <ArrowRight size={15} />
          </Button>
        </div>

        <ExportDialogButton selectedColorObject={selectedColorObject} />
      </div>

      <br />

      <div className="grid grid-cols-4 gap-2">
        <div className="col-span-1" style={{ height: 300 }}>
          <GraphTile chartType="barplot" palette={selectedColorObject}>
            <ResponsiveBarplot
              data={barplotData}
              colorList={selectedColorList}
            />
          </GraphTile>
        </div>
        <Heatmap
          data={heatmapData}
          width={300}
          height={300}
          colorList={selectedColorList}
        />
        <PieChart
          data={pieData}
          width={600}
          height={600}
          colorList={selectedColorList}
        />
      </div>
      <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
        <Treemap
          data={treemapData}
          width={300}
          height={300}
          colorList={selectedColorList}
        />
        <ChoroplethMap
          geoData={geoData}
          numData={numData}
          width={800}
          height={800}
          colorList={selectedColorList}
        />
        ,
      </div>
    </main>
  );
}
