"use client";

import { ColorPaletteSelectButton } from "@/components/ColorPaletteSelectButton";
import { colorPaletteList } from "@/data/color-palette-list";
import { Barplot } from "@/dataviz/barplot/Barplot";
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
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [selectedColorPalette, setSelectedColorPalette] =
    useState("ArcticGates");

  const selectedColorObject =
    colorPaletteList.find((col) => col.name === selectedColorPalette) ||
    colorPaletteList[0];

  const selectedColorList = getColorListFromString(selectedColorObject.palette);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ColorPaletteSelectButton
        selectedColorPalette={selectedColorPalette}
        setSelectedColorPalette={setSelectedColorPalette}
      />

      <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
        <Barplot
          data={barplotData}
          width={300}
          height={300}
          colorList={selectedColorList}
        />
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
        <Treemap data={treemapData} width={300} height={300} />
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
