import { ReactElement } from "react";

type GraphTileProps = {
  children: ReactElement;
};

export const GraphTile = ({ children }: GraphTileProps) => {
  return (
    <div
      className="col-span-1 border border-gray-200 p-4 rounded-sm"
      style={{ height: 300 }}
    >
      <div className="w-full h-full">{children}</div>
    </div>
  );
};
