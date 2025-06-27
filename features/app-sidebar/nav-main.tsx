"use client";

import { Moon } from "lucide-react";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

export function NavMain() {
  return (
    <SidebarGroup>
      <SidebarMenu>
        <SidebarMenuButton tooltip={"Agents"}>
          <Moon />
          <span>New Chat</span>
        </SidebarMenuButton>
        <SidebarMenuButton tooltip={"Agents"}>
          <Moon />
          <span>Agents</span>
        </SidebarMenuButton>
        <SidebarMenuButton tooltip={"Library"}>
          <Moon />
          <span>Library</span>
        </SidebarMenuButton>
      </SidebarMenu>
    </SidebarGroup>
  );
}
