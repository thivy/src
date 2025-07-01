"use client";

import Image from "next/image";

export const AppSidebarHeader = () => {
  return (
    <div className="flex h-header items-center">
      <div className="flex items-center gap-2 px-1.5">
        <Image src="/foundry-logo.png" alt="Logo" width={20} height={20} />
        <span className="font-semibold bg-linear-to-r from-blue-500 to-pink-500 bg-clip-text  text-transparent">
          AI Foundry
        </span>
      </div>
    </div>
  );
};
