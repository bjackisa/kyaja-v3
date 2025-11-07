import { Loader } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";

export default function SubmitButton({
  isLoading = false,
  buttonTitle,
  loadingButtonTitle,
  fullWidth = false,
}:any) {
  return (
    <div className="sm:col-span-1 mt-4">
      {isLoading ? (
        <button
          disabled
          type="button"
          className={cn(
            "w-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center",
            fullWidth && "w-full"
          )}
        >
          <Loader className="w-4 h-4 mr-3 text-white animate-spin" />
          {loadingButtonTitle}
        </button>
      ) : (
        <button
          type="submit"
          className={cn(
            "w-auto text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
            fullWidth && "w-full"
          )}
        >
          {buttonTitle}
        </button>
      )}
    </div>
  );
}
