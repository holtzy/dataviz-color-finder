import { Button } from "./ui/button";
import { ColorPalette } from "@/data/color-palette-list";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useEffect, useState } from "react";
import Confetti from "./Confetti";

export const ShareButton = ({
  selectedColorObject,
}: {
  selectedColorObject: ColorPalette;
}) => {
  const [text, setText] = useState("Copy");

  useEffect(() => setText("Copy"), [selectedColorObject]);

  const targetUrl =
    "https://python-graph-gallery.com/color-palette-finder/?palette=" +
    selectedColorObject.name.toLowerCase();

  const copyButton = (
    <Button
      variant={"outline"}
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
    <Popover onOpenChange={() => setText("Copy")}>
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

          <p className="text-sm pt-2">
            Use the URL below to share this palette with
            <br />
            your friend or your future self!
          </p>

          <div className="bg-gray-200 rounded-sm my-4 p-4 text-xs leading-6 overflow-hidden">
            <pre>
              <code>{targetUrl}</code>
            </pre>
          </div>

          {copyButton}
        </div>
      </PopoverContent>
    </Popover>
  );
};
