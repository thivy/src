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
import { AppPageHeader } from "../root/app-layout";
import ChatInput from "./chat-input";

const messages: {
  from: "user" | "assistant";
  content: string;
  avatar: string;
  name: string;
}[] = [
  {
    from: "user",
    content: "Hello, how are you?",
    avatar: "https://github.com/haydenbleasel.png",
    name: "Hayden Bleasel",
  },
  {
    from: "assistant",
    content: "I am fine, thank you!",
    avatar: "https://github.com/openai.png",
    name: "OpenAI",
  },
  {
    from: "user",
    content: "What is the weather in Tokyo?",
    avatar: "https://github.com/haydenbleasel.png",
    name: "Hayden Bleasel",
  },
  {
    from: "assistant",
    content: "The weather in Tokyo is sunny.",
    avatar: "https://github.com/openai.png",
    name: "OpenAI",
  },
  {
    from: "user",
    content: "Hello, how are you?",
    avatar: "https://github.com/haydenbleasel.png",
    name: "Hayden Bleasel",
  },
  {
    from: "assistant",
    content: "I am fine, thank you!",
    avatar: "https://github.com/openai.png",
    name: "OpenAI",
  },
  {
    from: "user",
    content: "What is the weather in Tokyo?",
    avatar: "https://github.com/haydenbleasel.png",
    name: "Hayden Bleasel",
  },
  {
    from: "assistant",
    content: "The weather in Tokyo is sunny.",
    avatar: "https://github.com/openai.png",
    name: "OpenAI",
  },
  {
    from: "user",
    content: "Hello, how are you?",
    avatar: "https://github.com/haydenbleasel.png",
    name: "Hayden Bleasel",
  },
  {
    from: "assistant",
    content: "I am fine, thank you!",
    avatar: "https://github.com/openai.png",
    name: "OpenAI",
  },
  {
    from: "user",
    content: "What is the weather in Tokyo?",
    avatar: "https://github.com/haydenbleasel.png",
    name: "Hayden Bleasel",
  },
  {
    from: "assistant",
    content: "The weather in Tokyo is sunny.",
    avatar: "https://github.com/openai.png",
    name: "OpenAI",
  },
  {
    from: "user",
    content: "Hello, how are you?",
    avatar: "https://github.com/haydenbleasel.png",
    name: "Hayden Bleasel",
  },
  {
    from: "assistant",
    content: "I am fine, thank you!",
    avatar: "https://github.com/openai.png",
    name: "OpenAI",
  },
  {
    from: "user",
    content: "What is the weather in Tokyo?",
    avatar: "https://github.com/haydenbleasel.png",
    name: "Hayden Bleasel",
  },
  {
    from: "assistant",
    content: "The weather in Tokyo is sunny.",
    avatar: "https://github.com/openai.png",
    name: "OpenAI",
  },
  {
    from: "user",
    content: "Hello, how are you?",
    avatar: "https://github.com/haydenbleasel.png",
    name: "Hayden Bleasel",
  },
  {
    from: "assistant",
    content: `
    # React Hooks Best Practices
React hooks are a powerful feature that let you use state and other React features without writing classes. Here are some tips for using them effectively:
## Rules of Hooks
1. **Only call hooks at the top level** of your component or custom hooks
2. **Don't call hooks inside loops, conditions, or nested functions**
## Common Hooks
- **useState**: For local component state
- **useEffect**: For side effects like data fetching
- **useContext**: For consuming context
- **useReducer**: For complex state logic
- **useCallback**: For memoizing functions
- **useMemo**: For memoizing values
## Example of useState and useEffect
\`\`\`jsx
function ProfilePage({ userId }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    // This runs after render and when userId changes
    fetchUser(userId).then(userData => {
      setUser(userData);
    });
  }, [userId]);
  
  return user ? <Profile user={user} /> : <Loading />;
}
\`\`\`
Would you like me to explain any specific hook in more detail?
    `,
    avatar: "https://github.com/haydenbleasel.png",
    name: "Hayden Bleasel",
  },
  {
    from: "assistant",
    content: `
    
    `,
    avatar: "https://github.com/openai.png",
    name: "OpenAI",
  },
];

const Example = () => {
  return (
    <ResizablePanelGroup
      className="flex h-screen overflow-hidden gap-2"
      direction="horizontal"
    >
      <ResizablePanel className="relative flex-1 min-w-[530px] h-screen flex flex-col">
        <AIConversation>
          <AIConversationContent className="@container">
            <AppPageHeader />
            {messages.map(({ content, ...message }, index) => (
              <AIMessage
                from={message.from}
                key={index}
                className="container max-w-3xl mx-auto px-2 @3xl:px-0"
              >
                <AIMessageContent>
                  <AIResponse>{content}</AIResponse>
                </AIMessageContent>
                {/* <AIMessageAvatar name={message.name} src={message.avatar} /> */}
              </AIMessage>
            ))}
          </AIConversationContent>
          <AIConversationScrollButton />
        </AIConversation>
        <ChatInput />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel className="min-w-96 h-full p-2 pl-0 max-h-svw overflow-hidden">
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
