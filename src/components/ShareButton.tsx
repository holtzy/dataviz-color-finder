import { Button } from "./ui/button";
import { ColorPalette } from "@/data/color-palette-list";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useEffect, useState } from "react";
import Confetti from "./Confetti";
import { HorizontalSeparator } from "./HorizontalSeparator";
import { LOWER_OPACITY } from "@/lib/utils";

type ShareButtonProps = {
  selectedColorObject: ColorPalette;
  selectedLanguage: "r" | "python";
  setAppOpacity: (opacity: number) => void;
};

export const ShareButton = ({
  selectedColorObject,
  selectedLanguage,
  setAppOpacity,
}: ShareButtonProps) => {
  const [text, setText] = useState("Copy");

  useEffect(() => setText("Copy"), [selectedColorObject]);

  const targetUrl =
    selectedLanguage === "r"
      ? "https://r-graph-gallery.com/color-palette-finder.html?palette=" +
        selectedColorObject.name.toLowerCase()
      : "https://python-graph-gallery.com/color-palette-finder/?palette=" +
        selectedColorObject.name.toLowerCase();

  const copyButton = (
    <Button
      className="relative border inline"
      onClick={() => {
        navigator.clipboard.writeText(targetUrl);
        setText("Ready to paste!");
      }}
    >
      {text}
      {text !== "Copy" && <Confetti />}
    </Button>
  );

  return (
    <Popover
      onOpenChange={(open) => {
        setAppOpacity(open ? LOWER_OPACITY : 1);
        setText("Copy");
      }}
    >
      <PopoverTrigger asChild>
        <Button
          className=" text-white "
          style={{
            background:
              "linear-gradient(to right, " +
              selectedColorObject.palette[0] +
              ", " +
              selectedColorObject.palette[1] +
              ")",
          }}
        >
          Share
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="relative mx-2 min-w-[400px] sm:min-w-[650px] rounded-md bg-gradient-to-r p-1 border-none"
        style={{
          background:
            "linear-gradient(to right, " +
            selectedColorObject.palette[0] +
            ", " +
            selectedColorObject.palette[1] +
            ")",
        }}
      >
        <div className="py-12 px-4 w-full bg-white rounded p-2 ">
          {/* Content */}
          <div className="font-bold text-lg">Share this palette</div>
          <HorizontalSeparator />
          <p className="text-sm">
            Use the URL below to share this palette with
            <br />
            your friend or your future self!
          </p>

          <div className="bg-gray-200 rounded-sm my-4 p-4 text-xs leading-6 overflow-hidden">
            <pre>
              <code>{targetUrl}</code>
            </pre>
          </div>
          <HorizontalSeparator />
          {copyButton}
        </div>
      </PopoverContent>
    </Popover>
  );
};
