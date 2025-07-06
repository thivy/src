import { UIMessage, useChat } from "@ai-sdk/react";
import { UIDataTypes, UITools } from "ai";
import React, { PropsWithChildren } from "react";

type ChatPageContextProps = {
  messages: UIMessage<unknown, UIDataTypes, UITools>[];
  sendMessage: unknown;
};

const ChatPageContext = React.createContext<ChatPageContextProps | null>(null);

export const useChatPage = () => {
  const context = React.useContext(ChatPageContext);
  if (!context) {
    throw new Error("useChatPage must be used within a ChatPage provider.");
  }

  return context;
};

type Props = PropsWithChildren;

export const ChatPageProvider = ({ children }: Props) => {
  const { messages, sendMessage } = useChat({});
  const contextValue = React.useMemo<ChatPageContextProps>(
    () => ({
      messages,
      sendMessage,
    }),
    [messages, sendMessage]
  );
  return (
    <ChatPageContext.Provider value={contextValue}>
      {children}
    </ChatPageContext.Provider>
  );
};
