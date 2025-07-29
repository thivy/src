"use client";

import { AIMessage, AIMessageContent } from "@/components/ui/ai/message";
import {
  AIResponse,
  AIResponseError,
  AIResponseLoading,
} from "@/components/ui/ai/response";
import { AISources } from "@/components/ui/ai/source";
import { UIMessage } from "ai";
import { useChatStoreContext } from "./chat-context";

export function Messages() {
  const { messages, status, error, regenerate } = useChatStoreContext();
  return (
    <>
      {messages.map((message) => {
        return (
          <AIMessage from={message.role} key={message.id}>
            {message.parts.map((part, index) =>
              part.type === "text" ? (
                <AIMessageContent key={index}>
                  <AIResponse>{part.text}</AIResponse>
                </AIMessageContent>
              ) : null
            )}
            <div className="flex gap-2 items-start">
              <Resources message={message} />
            </div>
          </AIMessage>
        );
      })}
      <AIResponseLoading status={status} text="loading" />
      <AIResponseError error={error} reload={regenerate} />
    </>
  );
}

const Resources = ({ message }: { message: UIMessage }) => {
  const resources = message.parts
    .filter((part) => part.type === "source-url")
    .map((part) => ({
      url: part.url ?? "",
      title: part.title ?? "",
    }));
  return <AISources sources={resources} />;
};
