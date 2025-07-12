"use client";

import {
  AIConversation,
  AIConversationContent,
  AIConversationScrollButton,
} from "@/components/ai/conversation";
import { AIMessage, AIMessageContent } from "@/components/ai/message";
import { AIResponse } from "@/components/ai/response";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useChat } from "@ai-sdk/react";
import { useState } from "react";
import { AppPageHeader } from "../root/app-layout";
import ChatInput from "./chat-input";

const Example = () => {
  const { messages, sendMessage, status } = useChat({});
  const [input, setInput] = useState("");

  return (
    <ResizablePanelGroup
      className="flex h-screen overflow-hidden gap-2"
      direction="horizontal"
    >
      <ResizablePanel className="relative flex-1 min-w-[530px] h-screen flex flex-col @container">
        <AIConversation>
          <AIConversationContent className="@container">
            <AppPageHeader />
            {messages.map((message) => (
              <AIMessage
                from={message.role}
                key={message.id}
                className="container max-w-3xl mx-auto px-2 @3xl:px-0"
              >
                {message.parts.map((part, index) =>
                  part.type === "text" ? (
                    <AIMessageContent key={index}>
                      <AIResponse>{part.text}</AIResponse>
                    </AIMessageContent>
                  ) : null
                )}
              </AIMessage>
            ))}
          </AIConversationContent>
          <AIConversationScrollButton />
        </AIConversation>
        <ChatInput
          value={input}
          onChange={(e) => setInput(e.target.value)}
          status={status}
          onSubmit={() => {
            sendMessage({ text: input });
            setInput("");
          }}
        />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel className="min-w-96 h-full max-h-svw overflow-hidden px-2">
        <AppPageHeader />
        <div className="inset-0 flex items-center justify-center h-full">
          Artifact Area
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
export default Example;
