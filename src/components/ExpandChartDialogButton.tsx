import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Expand } from "lucide-react";
import { ReactNode } from "react";

type ExpandChartDialogButtonProps = {
  children: ReactNode;
};

export const ExpandChartDialogButton = ({
  children,
}: ExpandChartDialogButtonProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Expand size={15} />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-4/5 h-4/5 max-w-[800px] max-h-[800px] py-20">
        {children}
      </DialogContent>
    </Dialog>
  );
};
