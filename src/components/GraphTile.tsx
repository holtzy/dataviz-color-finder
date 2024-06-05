import { Code, Expand } from "lucide-react";
import { ReactElement } from "react";
import { Button } from "./ui/button";

type GraphTileProps = {
  children: ReactElement;
};

export const GraphTile = ({ children }: GraphTileProps) => {
  return (
    <div className="group relative w-full h-full border border-gray-100 hover:border-black p-4 rounded-sm ">
      <div className="w-full h-full group-hover:opacity-50">{children}</div>
      <div className="absolute top-0 right-0 m-2  gap-2 hidden group-hover:flex">
        <Button>
          <Expand size={15} />
        </Button>
        <Button>
          <Code size={15} />
        </Button>
      </div>
    </div>
  );
};
