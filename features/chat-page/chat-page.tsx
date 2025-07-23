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
import Link from "next/link";
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
            threadId: "thread_ukoGF95P1scP3DLpROiydR8V",
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
            {messages.map((message) => {
              const resources = message.parts.filter(
                (part) => part.type === "source-url"
              );

              return (
                <AIMessage from={message.role} key={message.id}>
                  {message.parts.map((part, index) =>
                    part.type === "text" ? (
                      <AIMessageContent key={index}>
                        <AIResponse>{part.text}</AIResponse>
                      </AIMessageContent>
                    ) : null
                  )}

                  {resources.length > 0 && (
                    <div className="flex w-full flex-col gap-2">
                      {resources.map((part, index) => {
                        const faviconUrl = `https://www.google.com/s2/favicons?domain=${encodeURIComponent(
                          part.url
                        )}`;

                        return (
                          <Link
                            key={index}
                            href={part.url}
                            target="_blank"
                            className="text-blue-500 hover:underline text-xs"
                          >
                            <img
                              src={faviconUrl}
                              alt={part.title || "Resource"}
                              width={16}
                              height={16}
                              className="flex-shrink-0"
                            />
                            {part.title}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </AIMessage>
              );
            })}
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
      <ResizableHandle withHandle />
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
