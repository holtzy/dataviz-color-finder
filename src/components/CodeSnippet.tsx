import { Copy } from "lucide-react";
import { Button } from "./ui/button";
import Confetti from "./Confetti";
import { useState } from "react";

type CodeSnippetProps = {
  code: string;
};

export const CodeSnippet = ({ code }: CodeSnippetProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyButton = (
    <Button
      variant={"outline"}
      className="relative border inline"
      onClick={() => {
        navigator.clipboard.writeText(code);
        setIsCopied(true);
      }}
    >
      {isCopied ? (
        <>
          <p>Copied</p>
          {/* <Confetti /> */}
        </>
      ) : (
        <Copy size={16} />
      )}
    </Button>
  );

  return (
    <div
      className="relative bg-gray-200 rounded-sm mt-2 p-4 text-xs"
      style={{ overflow: "scroll" }}
    >
      <pre>
        <code>{code}</code>
      </pre>

      <div className="absolute top-0 right-0 pr-2 pt-2">{copyButton}</div>
    </div>
  );
};
