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
import { ResponsiveChoropleth } from "@/dataviz/choropleth/ResponsiveChoropleth";
import { geoData, numData } from "@/dataviz/choropleth/data";
import { Heatmap } from "@/dataviz/heatmap/Heatmap";
import { ResponsiveHeatmap } from "@/dataviz/heatmap/ResponsiveHeatmap";
import { heatmapData } from "@/dataviz/heatmap/data";
import { PieChart } from "@/dataviz/piechart/PieChart";
import { ResponsivePieChart } from "@/dataviz/piechart/ResponsivePieChart";
import { pieData } from "@/dataviz/piechart/data";
import { ResponsiveTreemap } from "@/dataviz/treemap/ResponsiveTreemap";
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

  const barplot = (
    <GraphTile chartType="barplot" palette={selectedColorObject}>
      <ResponsiveBarplot data={barplotData} colorList={selectedColorList} />
    </GraphTile>
  );

  const heatmap = (
    <GraphTile chartType="heatmap" palette={selectedColorObject}>
      <ResponsiveHeatmap data={heatmapData} colorList={selectedColorList} />
    </GraphTile>
  );

  const pieChart = (
    <GraphTile chartType="pie" palette={selectedColorObject}>
      <ResponsivePieChart data={pieData} colorList={selectedColorList} />
    </GraphTile>
  );

  const treemap = (
    <GraphTile chartType="treemap" palette={selectedColorObject}>
      <ResponsiveTreemap data={treemapData} colorList={selectedColorList} />
    </GraphTile>
  );

  const choropleth = (
    <GraphTile chartType="choropleth" palette={selectedColorObject}>
      <ResponsiveChoropleth
        geoData={geoData}
        numData={numData}
        colorList={selectedColorList}
      />
    </GraphTile>
  );

  const prevAndNextButtons = (
    <div className="flex gap-2">
      <Button variant={"outline"} onClick={switchToPreviousPalette}>
        <ArrowLeft size={15} />
      </Button>
      <Button variant={"outline"} onClick={switchToNextPalette}>
        <ArrowRight size={15} />
      </Button>
    </div>
  );

  const paletteSelectButton = (
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
  );

  const filterButton = (
    <Button variant={"outline"}>
      <Filter />
    </Button>
  );

  return (
    <main className="flex flex-col py-12 px-2 gap-12">
      {/* Small & Md screen: Control Buttons Row */}
      <div className="flex md:hidden flex-col gap-8 ">
        <div className="flex gap-6 items-top opacity-60">
          {filterButton}
          {prevAndNextButtons}
          <ExportDialogButton selectedColorObject={selectedColorObject} />
        </div>
        {paletteSelectButton}
      </div>

      {/* > medium screen: Control Buttons Row */}
      <div className="hidden md:flex gap-6 items-top">
        {filterButton}
        {paletteSelectButton}
        {prevAndNextButtons}
        <ExportDialogButton selectedColorObject={selectedColorObject} />
      </div>

      {/* Small screen */}
      <div className="grid md:hidden grid-cols-2 gap-1 w-full">
        <div className="col-span-1" style={{ height: 300 }}>
          {barplot}
        </div>
        <div className="col-span-1" style={{ height: 300 }}>
          {heatmap}
        </div>
        <div className="col-span-1" style={{ height: 300 }}>
          {pieChart}
        </div>
        <div className="col-span-1" style={{ height: 300 }}>
          {treemap}
        </div>
      </div>

      {/* big screen */}
      <div className="hidden lg:grid xl:hidden grid-cols-4 gap-2 w-full mt-20">
        <div className="col-span-1" style={{ height: 300 }}>
          {barplot}
        </div>
        <div className="col-span-1" style={{ height: 300 }}>
          {heatmap}
        </div>
        <div className="col-span-2" style={{ height: 600 }}>
          {pieChart}
        </div>
        <div className="col-span-1" style={{ height: 300 }}>
          {treemap}
        </div>
        <div className="col-span-3" style={{ height: 700 }}>
          {choropleth}
        </div>
      </div>

      {/* massive screen */}
      <div className="hidden xl:grid grid-cols-4 gap-2 w-full mt-20 max-w-[2300px]">
        <div className="col-span-1" style={{ height: 300 }}>
          {barplot}
        </div>
        <div className="col-span-1" style={{ height: 300 }}>
          {heatmap}
        </div>
        <div className="col-span-2" style={{ height: 600 }}>
          {pieChart}
        </div>
        <div className="col-span-1" style={{ height: 300 }}>
          {treemap}
        </div>
        <div className="col-span-3" style={{ height: 700 }}>
          {choropleth}
        </div>
      </div>
    </main>
  );
}
