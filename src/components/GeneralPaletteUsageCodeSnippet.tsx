import { ColorPalette } from "@/data/color-palette-list";

type GeneralPaletteUsageCodeSnippetProps = {
  language: "r" | "python";
  selectedColorObject: ColorPalette;
};

export const GeneralPaletteUsageCodeSnippet = ({
  language,
  selectedColorObject,
}: GeneralPaletteUsageCodeSnippetProps) => {
  const snippetPythonCode = `
from pypalettes import load_cmap
cmap = load_cmap("${selectedColorObject.name}")
`.trim();

  const pkg = selectedColorObject.source
    .replace("The R package: {", "")
    .replace("}", "");
  const completePaletteName = pkg + "::" + selectedColorObject.name;

  const snippetRCode = `
# Load library
library(paletteer)

scale_colour_paletteer_d("${completePaletteName}")
scale_color_paletteer_d("${completePaletteName}")
scale_fill_paletteer_d("${completePaletteName}")
paletteer_d("${completePaletteName}")
`.trim();

  if (language === "python") {
    return (
      <div className="flex justify-center items-center flex-col">
        <p className="max-w-lg text-center">🔥🔥</p>
        <p className="max-w-md text-center">
          Two lines of Python code to use the palette at home thanks to the{" "}
          <a
            href="https://github.com/JosephBARBIERDARNAL/pypalettes"
            target="_blank"
            className="gradient underline"
          >
            pypalettes
          </a>{" "}
          library.
        </p>
        <div className="bg-gray-50 rounded-sm mt-2 p-4 text-xs leading-5">
          <pre>
            <code>{snippetPythonCode}</code>
          </pre>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center flex-col">
      <p className="max-w-lg text-center">🔥🔥</p>
      <p className="max-w-md text-center">
        Just a few lines of R code to use the palette at home thanks to the{" "}
        <a
          href="https://r-graph-gallery.com/package/paletteer.html"
          target="_blank"
          className="gradient underline"
        >
          paletteer
        </a>{" "}
        library.
      </p>
      <div className="bg-gray-50 rounded-sm mt-2 p-4 text-xs leading-5 w-[600px]">
        <pre>
          <code>{snippetRCode}</code>
        </pre>
      </div>
    </div>
  );
};
