"use client";
import { createContext, ReactNode, useContext } from "react";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState } from "react";

// Define the context type based on the return type of useChatStore
const ChatStoreContext = createContext<
  ReturnType<typeof useChatStore> | undefined
>(undefined);

export const ChatStoreProvider = ({ children }: { children: ReactNode }) => {
  const chatStore = useChatStore();
  return (
    <ChatStoreContext.Provider value={chatStore}>
      {children}
    </ChatStoreContext.Provider>
  );
};

export const useChatStoreContext = () => {
  const context = useContext(ChatStoreContext);
  if (!context) {
    throw new Error(
      "useChatStoreContext must be used within a ChatStoreProvider"
    );
  }
  return context;
};

export const useChatStore = () => {
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

  return {
    input,
    setInput,
    messages,
    sendMessage,
    status,
    error,
    regenerate,
  };
};
