"use client";

import { ColorPaletteSelectButton } from "@/components/ColorPaletteSelectButton";
import { ExportDialogButton } from "@/components/ExportDialogButton";
import { FilterDialogButton } from "@/components/FilterDialogButton";
import { GraphTile } from "@/components/GraphTile";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PaletteKind, colorPaletteList } from "@/data/color-palette-list";
import { ResponsiveBarplot } from "@/dataviz/barplot/ResponsiveBarplot";
import { barplotData } from "@/dataviz/barplot/data";
import { ResponsiveBubblePlot } from "@/dataviz/bubbleplot/ResponsiveBubblePlot";
import { bubblePlotData } from "@/dataviz/bubbleplot/data";
import { ResponsiveChoropleth } from "@/dataviz/choropleth/ResponsiveChoropleth";
import { geoData, numData } from "@/dataviz/choropleth/data";
import { ResponsiveHeatmap } from "@/dataviz/heatmap/ResponsiveHeatmap";
import { heatmapData } from "@/dataviz/heatmap/data";
import { ResponsivePieChart } from "@/dataviz/piechart/ResponsivePieChart";
import { pieData } from "@/dataviz/piechart/data";
import { ResponsiveStreamgraph } from "@/dataviz/streamgraph/ResponsiveStreamgraph";
import { dataStreamgraph } from "@/dataviz/streamgraph/data";
import { ResponsiveTreemap } from "@/dataviz/treemap/ResponsiveTreemap";
import { treemapData } from "@/dataviz/treemap/data";
import { ArrowLeft, ArrowRight, Filter } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const [selectedPaletteId, setSelectedPaletteId] = useState(0);
  const [displayedNumber, setDisplayedNumber] = useState(100);

  const [enabledPaletteKinds, setEnabledPaletteKinds] = useState<PaletteKind[]>(
    ["qualitative", "diverging", "sequential"]
  );

  const filteredColorPaletteList = colorPaletteList
    .slice(0, displayedNumber)
    .filter((p) => enabledPaletteKinds.includes(p.kind));

  const selectedColorObject = filteredColorPaletteList[selectedPaletteId];
  const selectedColorList = selectedColorObject.palette;

  const snippetPythonCode = `
from pypalettes import load_cmap
cmap = load_cmap("${selectedColorObject.name}")
`.trim();

  const switchToPreviousPalette = () => {
    const newId =
      selectedPaletteId - 1 < 0
        ? filteredColorPaletteList.length - 1
        : selectedPaletteId - 1;
    setSelectedPaletteId(newId);
  };

  const switchToNextPalette = () => {
    const newId =
      selectedPaletteId + 2 > filteredColorPaletteList.length
        ? 0
        : selectedPaletteId + 1;
    setSelectedPaletteId(newId);
  };

  const showMorePalette = () => {
    setDisplayedNumber(displayedNumber + 200);
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

  const bubbleplot = (
    <GraphTile chartType="bubble" palette={selectedColorObject}>
      <ResponsiveBubblePlot
        data={bubblePlotData}
        colorList={selectedColorList}
      />
    </GraphTile>
  );

  const streamgraph = (
    <GraphTile chartType="streamgraph" palette={selectedColorObject}>
      <ResponsiveStreamgraph
        data={dataStreamgraph}
        colorList={selectedColorList}
      />
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
        paletteList={filteredColorPaletteList}
        selectedPaletteId={selectedPaletteId}
        setSelectedPaletteId={setSelectedPaletteId}
        showMorePalette={showMorePalette}
      />
      <div className="flex gap-2 pt-2 text-xs text-gray-500">
        <span>Source: </span>
        <span>{selectedColorObject.source}</span>
        <Separator orientation="vertical" />
        <span>{selectedColorList.length + " colors"}</span>
        <Separator orientation="vertical" />
        <span>{selectedColorObject.kind}</span>
      </div>
    </div>
  );

  return (
    <main className="flex flex-col py-12 gap-12">
      {/* Small & Md screen: Control Buttons Row */}
      <div className="flex md:hidden flex-col gap-8 px-8">
        <div className="flex gap-6 items-top opacity-60">
          <FilterDialogButton
            setEnabledPaletteKinds={setEnabledPaletteKinds}
            enabledPaletteKinds={enabledPaletteKinds}
          />
          {prevAndNextButtons}
          <ExportDialogButton selectedColorObject={selectedColorObject} />
        </div>
        {paletteSelectButton}
      </div>

      {/* > medium screen: Control Buttons Row */}
      <div className="hidden md:flex gap-6 items-top px-8 justify-center">
        <FilterDialogButton
          setEnabledPaletteKinds={setEnabledPaletteKinds}
          enabledPaletteKinds={enabledPaletteKinds}
        />
        {paletteSelectButton}
        {prevAndNextButtons}
        <ExportDialogButton selectedColorObject={selectedColorObject} />
      </div>

      {/* ----------- */}

      <div className="bg-gray-50 py-10 flex justify-center">
        {/* Small & md screen */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 gap-y-10 w-full px-12 max-w-[1500px] ">
          <div className="col-span-1" style={{ height: 280 }}>
            {barplot}
          </div>
          <div className="col-span-1" style={{ height: 280 }}>
            {heatmap}
          </div>
          <div className="col-span-1" style={{ height: 280 }}>
            {pieChart}
          </div>
          <div className="col-span-1" style={{ height: 280 }}>
            {treemap}
          </div>
          <div className="col-span-1" style={{ height: 280 }}>
            {bubbleplot}
          </div>
          <div className="col-span-1" style={{ height: 280 }}>
            {streamgraph}
          </div>
          <div className="col-span-1" style={{ height: 280 }}>
            {choropleth}
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center flex-col">
        <p className="max-w-lg text-center">🔥🔥</p>
        <p className="max-w-md text-center">
          Two lines of Python code to use the palette at home thanks to the{" "}
          <a
            href="https://github.com/JosephBARBIERDARNAL/pypalettes"
            target="_blank"
            className="gradient underline"
          >
            pypalette
          </a>{" "}
          library.
        </p>
        <div className="bg-gray-50 rounded-sm mt-2 p-4 text-xs leading-6">
          <pre>
            <code>{snippetPythonCode}</code>
          </pre>
        </div>{" "}
      </div>
    </main>
  );
}
