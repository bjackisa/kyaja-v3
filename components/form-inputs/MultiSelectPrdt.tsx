import * as React from "react";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";

export function FancyMultiSelect({ products, selectedProducts, setSelectedProducts }) {
  const inputRef = React.useRef(null);
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  const handleUnselect = React.useCallback((productId) => {
    setSelectedProducts((prev) => prev.filter((id) => id !== productId));
  }, [setSelectedProducts]);

  const handleKeyDown = React.useCallback(
    (e) => {
      const input = inputRef.current;
      if (input && (e.key === "Delete" || e.key === "Backspace") && input.value === "") {
        setSelectedProducts((prev) => {
          const newSelected = [...prev];
          newSelected.pop();
          return newSelected;
        });
      }
      if (e.key === "Escape") {
        input?.blur();
      }
    },
    [setSelectedProducts]
  );

  const selectables = products.filter(
    (product) => !selectedProducts.includes(product.id)
  );

  return (
    <div>
      <h2 className="text-lg text-black font-semibold mb-4">Banner Products</h2>
      <Command
        onKeyDown={handleKeyDown}
        className="overflow-visible bg-transparent mb-3"
      >
        <div className="group rounded-md border-2 border-[#3730a3] border-input px-3 py-4 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 mb-2">
          <div className="flex flex-wrap gap-1">
            {selectedProducts.map((productId) => {
              const product = products.find(p => p.id === productId);
              return product ? (
                <Badge key={product.id} className="!py-2 bg-white " variant="secondary">
                  {product.title}
                  <button
                    className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleUnselect(product.id);
                      }
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onClick={() => handleUnselect(product.id)}
                  >
                    <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                  </button>
                </Badge>
              ) : null;
            })}
            <CommandPrimitive.Input
              ref={inputRef}
              value={inputValue}
              onValueChange={setInputValue}
              onBlur={() => setOpen(false)}
              onFocus={() => setOpen(true)}
              placeholder="Select products..."
              className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground mt-4 rounded-md"
            />
          </div>
        </div>
        <div className="relative mt-2">
          <CommandList>
            {open && selectables.length > 0 ? (
              <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
                <CommandGroup className="h-full overflow-auto">
                  {selectables.map((product) => (
                    <CommandItem
                      key={product.id}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onSelect={() => {
                        setInputValue("");
                        setSelectedProducts((prev) => [...prev, product.id]);
                      }}
                      className={"cursor-pointer"}
                    >
                      {product.title}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </div>
            ) : null}
          </CommandList>
        </div>
      </Command>
    </div>
  );
}