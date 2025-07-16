"use client";

import {
  AIConversation,
  AIConversationContent,
  AIConversationScrollButton,
} from "@/components/ui/ai/conversation";
import { AIMessage, AIMessageContent } from "@/components/ui/ai/message";
import {
  AIResponse,
  AIResponseError,
  AIResponseLoading,
} from "@/components/ui/ai/response";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState } from "react";
import { AppPageHeader } from "../root/app-layout";
import ChatInput from "./chat-input";

const ChatPage = () => {
  const [input, setInput] = useState("");

  const { messages, sendMessage, status, error, regenerate } = useChat({
    id: "azure-chat",
    onError: (error) => {
      console.error("Error sending message:", error);
    },
    transport: new DefaultChatTransport({
      prepareSendMessagesRequest: ({ id, messages }) => {
        return {
          body: {
            id,
            threadId: "thread_gmBqVy3vsETknVAVClDjN00g",
            message: messages[messages.length - 1],
          },
        };
      },
    }),
  });

  return (
    <ResizablePanelGroup
      className="flex h-screen overflow-hidden"
      direction="horizontal"
    >
      <ResizablePanel className="relative flex-1 md:min-w-[530px] h-screen flex flex-col @container ">
        <AIConversation>
          <AIConversationContent className="@container pb-[120px] ">
            <AppPageHeader />
            {messages.map((message) => (
              <AIMessage from={message.role} key={message.id}>
                {message.parts.map((part, index) =>
                  part.type === "text" ? (
                    <AIMessageContent key={index}>
                      <AIResponse>{part.text}</AIResponse>
                    </AIMessageContent>
                  ) : null
                )}
              </AIMessage>
            ))}
            <AIResponseLoading status={status} text="loading" />
            <AIResponseError error={error} reload={regenerate} />
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
      <ResizableHandle withHandle className="mx-1" />
      <ResizablePanel className="min-w-96 h-full max-h-svw overflow-hidden">
        <AppPageHeader />
        <div className="inset-0 flex items-center justify-center h-full">
          Artifact Area
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
export default ChatPage;
