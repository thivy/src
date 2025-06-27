"use client";

import { BotIcon, FilesIcon, SearchIcon, SquarePenIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

export function NavMain() {
  return (
    <SidebarGroup>
      <SidebarMenu className="gap-0">
        <SidebarMenuButton tooltip={"Agents"}>
          <SquarePenIcon />
          <span>New chat</span>
        </SidebarMenuButton>
        <SidebarMenuButton tooltip={"Agents"}>
          <SearchIcon />
          <span>Search chats</span>
        </SidebarMenuButton>
        <SidebarMenuButton tooltip={"Agents"}>
          <BotIcon />
          <span>Agents</span>
        </SidebarMenuButton>
        <SidebarMenuButton tooltip={"Library"}>
          <FilesIcon />
          <span>Library</span>
        </SidebarMenuButton>
      </SidebarMenu>
    </SidebarGroup>
  );
}
