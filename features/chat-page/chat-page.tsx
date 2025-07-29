import {
  AIConversation,
  AIConversationContent,
  AIConversationScrollButton,
} from "@/components/ui/ai/conversation";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { AppPageHeader } from "../root/app-layout";
import { ChatStoreProvider } from "./chat-context";
import ChatInput from "./chat-input";
import { Messages } from "./chat-message";

const ChatPage = () => {
  return (
    <ChatStoreProvider>
      <ResizablePanelGroup
        className="flex h-screen overflow-hidden"
        direction="horizontal"
      >
        <ResizablePanel className="relative flex-1 md:min-w-[530px] h-screen flex flex-col @container ">
          <AIConversation>
            <AIConversationContent className="@container pb-[120px] ">
              <AppPageHeader />
              <Messages />
            </AIConversationContent>
            <AIConversationScrollButton />
          </AIConversation>
          <ChatInput />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel className="min-w-96 h-full max-h-svw overflow-hidden">
          <AppPageHeader />
          <div className="inset-0 flex items-center justify-center h-full">
            Artifact Area
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </ChatStoreProvider>
  );
};

export default ChatPage;
