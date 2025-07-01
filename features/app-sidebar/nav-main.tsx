"use client";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  File01Icon,
  QuillWrite02Icon,
  Robot01Icon,
  Search02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export function NavMain() {
  return (
    <SidebarGroup>
      <SidebarMenu className="gap-0">
        <SidebarMenuButton tooltip={"New Chat"}>
          <HugeiconsIcon icon={QuillWrite02Icon} />
          <span>New chat</span>
        </SidebarMenuButton>
        <SidebarMenuButton tooltip={"Search chats"}>
          <HugeiconsIcon strokeWidth={1.5} icon={Search02Icon} />
          <span>Search chats</span>
        </SidebarMenuButton>
        <SidebarMenuButton tooltip={"Agents"}>
          <HugeiconsIcon strokeWidth={1.5} icon={Robot01Icon} />
          <span>Agents</span>
        </SidebarMenuButton>
        <SidebarMenuButton tooltip={"Library"}>
          <HugeiconsIcon icon={File01Icon} strokeWidth={1.5} />
          <span>Library</span>
        </SidebarMenuButton>
      </SidebarMenu>
    </SidebarGroup>
  );
}
