type GeneralPaletteUsageCodeSnippetProps = {
  language: "r" | "python";
  paletteName: string;
};

export const GeneralPaletteUsageCodeSnippet = ({
  language,
  paletteName,
}: GeneralPaletteUsageCodeSnippetProps) => {
  const snippetPythonCode = `
from pypalettes import load_cmap
cmap = load_cmap("${paletteName}")
`.trim();

  const snippetRCode = `
# Load library
library(paleteer)

scale_colour_paletteer_d("${paletteName}")
scale_color_paletteer_d("${paletteName}")
scale_fill_paletteer_d("${paletteName}")
paletteer_d("${paletteName}")
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
          paleteer
        </a>{" "}
        library.
      </p>
      <div className="bg-gray-50 rounded-sm mt-2 p-4 text-xs leading-5">
        <pre>
          <code>{snippetRCode}</code>
        </pre>
      </div>
    </div>
  );
};
