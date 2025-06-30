"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { AppPageHeader } from "../root/app-layout";
import ChatInput from "./chat-input";

const Example = () => {
  return (
    <ResizablePanelGroup className="flex h-full " direction="horizontal">
      <ResizablePanel
        defaultSize={25}
        className="relative flex-1 min-w-96 h-full"
      >
        <AppPageHeader />
        <ChatInput />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={25} className="min-w-96 h-full p-2 ">
        <div className="relative flex-1 h-full bg-sidebar border-border border rounded-xl">
          <div className="inset-0 flex items-center justify-center h-full">
            Canvas Area
          </div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
export default Example;
