"use client";

import { ColorBlindnessSelectButton } from "@/components/ColorBlindnessSelectButton";
import { ColorPaletteSelectButton } from "@/components/ColorPaletteSelectButton";
import { ExportDialogButton } from "@/components/ExportDialogButton";
import { FilterDialogButton } from "@/components/FilterDialogButton";
import { GraphTile } from "@/components/GraphTile";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ToastAction } from "@/components/ui/toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
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
import {
  ColorBlindnessType,
  clrDeutan,
  clrProtan,
  clrTritan,
  hexToGrayscale,
} from "@/lib/get-color-blindness-simulation";
import { ArrowLeft, ArrowRight, Gift, Loader } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ShareButton } from "@/components/ShareButton";
import { GeneralPaletteUsageCodeSnippet } from "@/components/GeneralPaletteUsageCodeSnippet";
import { ggplot2Theme, matplotlibTheme } from "@/dataviz/theme";
import { getPaletteSimilarityScore } from "@/lib/get-palette-similarity-score";

export default function Home() {
  // User can enter a palette name in the URL to see it directly
  const searchParams = useSearchParams();
  const urlPalette = searchParams.get("palette");
  const urlLanguage = searchParams.get("language");

  const [selectedPalette, setSelectedPalette] = useState(
    urlPalette || "Acadia"
  );

  const selectedLanguage: "r" | "python" = urlLanguage === "r" ? "r" : "python";

  const [selectedColorBlindness, setSelectedColorBlindness] =
    useState<ColorBlindnessType>("Normal vision");

  const [selectedColorTarget, setSelectedColorTarget] = useState<
    string | undefined
  >(undefined);

  const [appOpacity, setAppOpacity] = useState(1);

  const [enabledPaletteKinds, setEnabledPaletteKinds] = useState<PaletteKind[]>(
    ["qualitative", "diverging", "sequential"]
  );
  const [enabledPaletteLength, setEnabledPaletteLength] = useState<number[]>([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
  ]);

  const [isNextToastAllowed, setIsNextToastAllowed] = useState(true);
  const { toast } = useToast();

  const [isRandomPaletteUpdating, setIsRandomPaletteUpdating] = useState(false);

  const getRandomNumber = () => Math.floor(Math.random() * 2000) + 1;

  useEffect(() => {
    if (isRandomPaletteUpdating) {
      let delay = 5; // Initial delay in milliseconds

      const updateNumber = () => {
        setSelectedPalette(filteredColorPaletteList[getRandomNumber()].name);
        delay *= 1.2; // Increase delay to slow down progressively
        if (delay < 500) {
          // Stop when delay is too long (or any condition you prefer)
          setTimeout(updateNumber, delay);
        } else {
          setIsRandomPaletteUpdating(false); // Stop updating
        }
      };

      updateNumber();
    }
  }, [isRandomPaletteUpdating]);

  const filteredColorPaletteList = useMemo(() => {
    const filtered = colorPaletteList
      .filter((p) => enabledPaletteKinds.includes(p.kind))
      .filter((p) => enabledPaletteLength.includes(p.palette.length));

    let filteredAndSorted = filtered;
    if (selectedColorTarget) {
      const palettesWithScores = filtered.map((p) => ({
        palette: p,
        score: getPaletteSimilarityScore(p.palette, selectedColorTarget),
      }));

      palettesWithScores.sort((a, b) => a.score - b.score);

      filteredAndSorted = palettesWithScores
        .slice(0, 50)
        .map((pws) => pws.palette);
    }

    return filteredAndSorted;
  }, [
    colorPaletteList,
    enabledPaletteKinds,
    enabledPaletteLength,
    selectedColorTarget,
  ]);

  const selectedColorObject =
    colorPaletteList.find(
      (c) => c.name.toLowerCase() === selectedPalette.toLowerCase()
    ) || colorPaletteList[0];

  const selectedColorList = selectedColorObject.palette.map((c) => {
    return selectedColorBlindness === "Protanopia"
      ? clrProtan(c)
      : selectedColorBlindness === "Deuteranopia"
      ? clrDeutan(c)
      : selectedColorBlindness === "Tritanopia"
      ? clrTritan(c)
      : selectedColorBlindness === "Grey scale"
      ? hexToGrayscale(c)
      : c;
  });

  useEffect(() => {
    if (selectedColorTarget) {
      setSelectedPalette(filteredColorPaletteList[0].name);
    }
  }, [selectedColorTarget]);

  const switchToPreviousPalette = () => {
    const currentId = filteredColorPaletteList.findIndex(
      (c) => c.name === selectedPalette
    );
    const newId =
      currentId - 1 < 0 ? filteredColorPaletteList.length - 1 : currentId - 1;
    setSelectedPalette(filteredColorPaletteList[newId].name);
  };

  const switchToNextPalette = () => {
    const currentId = filteredColorPaletteList.findIndex(
      (c) => c.name === selectedPalette
    );
    const newId =
      currentId + 2 > filteredColorPaletteList.length ? 0 : currentId + 1;
    setSelectedPalette(filteredColorPaletteList[newId].name);
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

  const datavizTheme =
    selectedLanguage === "r" ? ggplot2Theme : matplotlibTheme;

  const barplot = (
    <GraphTile
      chartType="barplot"
      palette={selectedColorObject}
      selectedLanguage={selectedLanguage}
      setAppOpacity={setAppOpacity}
    >
      <ResponsiveBarplot
        data={barplotData}
        colorList={selectedColorList}
        datavizTheme={datavizTheme}
      />
    </GraphTile>
  );

  const heatmap = (
    <GraphTile
      chartType="heatmap"
      palette={selectedColorObject}
      selectedLanguage={selectedLanguage}
      setAppOpacity={setAppOpacity}
    >
      <ResponsiveHeatmap data={heatmapData} colorList={selectedColorList} />
    </GraphTile>
  );

  const pieChart = (
    <GraphTile
      chartType="pie"
      palette={selectedColorObject}
      selectedLanguage={selectedLanguage}
      setAppOpacity={setAppOpacity}
    >
      <ResponsivePieChart data={pieData} colorList={selectedColorList} />
    </GraphTile>
  );

  const treemap = (
    <GraphTile
      chartType="treemap"
      palette={selectedColorObject}
      selectedLanguage={selectedLanguage}
      setAppOpacity={setAppOpacity}
    >
      <ResponsiveTreemap data={treemapData} colorList={selectedColorList} />
    </GraphTile>
  );

  const bubbleplot = (
    <GraphTile
      chartType="bubble"
      palette={selectedColorObject}
      selectedLanguage={selectedLanguage}
      setAppOpacity={setAppOpacity}
    >
      <ResponsiveBubblePlot
        data={bubblePlotData}
        colorList={selectedColorList}
        datavizTheme={datavizTheme}
      />
    </GraphTile>
  );

  const streamgraph = (
    <GraphTile
      chartType="streamgraph"
      palette={selectedColorObject}
      selectedLanguage={selectedLanguage}
      setAppOpacity={setAppOpacity}
    >
      <ResponsiveStreamgraph
        data={dataStreamgraph}
        colorList={selectedColorList}
        datavizTheme={datavizTheme}
      />
    </GraphTile>
  );

  const choropleth = (
    <GraphTile
      chartType="choropleth"
      palette={selectedColorObject}
      selectedLanguage={selectedLanguage}
      setAppOpacity={setAppOpacity}
    >
      <ResponsiveChoropleth
        geoData={geoData as any}
        numData={numData}
        colorList={selectedColorList}
        datavizTheme={datavizTheme}
      />
    </GraphTile>
  );

  const helpText = (
    <>
      <p>Use your keyboard!</p>
      <div className="flex gap-2 items-center mt-1">
        <div className="border border-gray-200 rounded-sm p-2">
          <ArrowLeft size="14" />
        </div>
        <div className="border border-gray-200 rounded-sm p-2">
          <ArrowRight size="14" />
        </div>
        to switch palette
      </div>
    </>
  );

  const prevAndNextButtons = (
    <div className="flex gap-2">
      <Button variant={"outline"} onClick={switchToPreviousPalette}>
        <ArrowLeft size={15} />
      </Button>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger style={{ height: 40 }}>
            <Button
              variant={"outline"}
              onClick={() => {
                {
                  isNextToastAllowed &&
                    toast({
                      title: "Pro Tip 🔥",
                      description: helpText,
                      action: (
                        <ToastAction altText="Got it">Got it!</ToastAction>
                      ),
                    });
                }
                switchToNextPalette();
                setIsNextToastAllowed(false);
              }}
            >
              <ArrowRight size={15} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>{helpText}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );

  const paletteSelectButton = (
    <div className="flex flex-col">
      <ColorPaletteSelectButton
        filteredColorPaletteList={filteredColorPaletteList}
        selectedPalette={selectedPalette}
        setSelectedPalette={setSelectedPalette}
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

  const shareButton = (
    <ShareButton
      selectedColorObject={selectedColorObject}
      selectedLanguage={selectedLanguage}
      setAppOpacity={setAppOpacity}
    />
  );

  const surpriseMeButton = (
    <Button
      variant={"outline"}
      onClick={() => setIsRandomPaletteUpdating(true)}
    >
      {isRandomPaletteUpdating ? (
        <Loader size={22} className="spin" />
      ) : (
        <Gift size={22} />
      )}
    </Button>
  );

  const filterPaletteDialog = (
    <FilterDialogButton
      setEnabledPaletteKinds={setEnabledPaletteKinds}
      enabledPaletteKinds={enabledPaletteKinds}
      setEnabledPaletteLength={setEnabledPaletteLength}
      enabledPaletteLength={enabledPaletteLength}
      remainingPaletteNumber={filteredColorPaletteList.length}
      setAppOpacity={setAppOpacity}
      selectedColorTarget={selectedColorTarget}
      setSelectedColorTarget={setSelectedColorTarget}
    />
  );

  const colorBlindnessButton = (
    <ColorBlindnessSelectButton
      selectedColorBlindness={selectedColorBlindness}
      setSelectedColorBlindness={setSelectedColorBlindness}
    />
  );

  const exportButton = (
    <ExportDialogButton
      selectedColorObject={selectedColorObject}
      selectedLanguage={selectedLanguage}
      setAppOpacity={setAppOpacity}
    />
  );

  return (
    <main
      className="flex flex-col py-12 gap-12"
      style={{ opacity: appOpacity }}
    >
      {/* Small & Md screen: Control Buttons Row */}
      <div className="flex md:hidden flex-col gap-2 px-2">
        <div className="flex gap-1 items-top opacity-60">
          {filterPaletteDialog}
          {prevAndNextButtons}
          {exportButton}
          {colorBlindnessButton}
          {surpriseMeButton}
          {shareButton}
        </div>
        {paletteSelectButton}
      </div>

      {/* > medium screen: Control Buttons Row */}
      <div className="hidden md:flex gap-6 items-top px-8 justify-center">
        {filterPaletteDialog}
        {paletteSelectButton}
        {prevAndNextButtons}
        {exportButton}
        {colorBlindnessButton}
        {surpriseMeButton}
        {shareButton}
      </div>

      {/* ----------- */}

      <div className="bg-gray-50 py-10 flex justify-center">
        {/* Small & md screen */}
        <div className="grid grid-cols1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 gap-y-10 w-full px-12 max-w-[1500px] ">
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

      <GeneralPaletteUsageCodeSnippet
        language={selectedLanguage}
        selectedColorObject={selectedColorObject}
      />
    </main>
  );
}
