"use client";

import { House } from "lucide-react";

export const AppSidebarHeader = () => {
  return (
    <div className="flex h-16 items-center -m-2">
      <div className="px-4">
        <House size={18} />
      </div>
    </div>
  );
};
