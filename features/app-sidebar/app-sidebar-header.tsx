import Image from "next/image";

export const AppSidebarHeader = () => {
  return (
    <div className="flex h-header items-center">
      <div className="flex items-center gap-2 px-1.5">
        <Image src="/foundry-logo.png" alt="Logo" width={20} height={20} />
        <span className="truncate font-medium text-blue-400/80 group-data-[collapsible=icon]:hidden">
          Azure Chat
        </span>
      </div>
    </div>
  );
};
