import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "react-toastify";

const colors = {
 
    orange: ["#f68b1e", "#f59e0b", "#d97706", "#ff9900",],
    red: ["#3b0764","#2e1065", "#4c1d95", "#633185"],
  };

export function ColorPicker() {
  const copyToClipboard = (color:string) => {
    navigator.clipboard.writeText(color);
    toast.success(`Copied ${color} to clipboard`);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#ea580c] text-white font-semibold" variant="outline">Pick Color</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <h2 className="text-xl font-bold mb-4">Click Color to Copy</h2>
        <div className="grid grid-cols-4 gap-8">
          {Object.entries(colors).map(([colorName, shades]) =>
            shades.map((color, index) => (
              <div
                key={`${colorName}-${index}`}
                className="w-[5rem] h-[5rem] rounded-full cursor-pointer "
                style={{ backgroundColor: color }}
                onClick={() => copyToClipboard(color)}
                title={color}
              />
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
