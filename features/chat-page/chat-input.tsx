"use client";
import {
  AIInput,
  AIInputButton,
  AIInputModelSelect,
  AIInputModelSelectContent,
  AIInputModelSelectItem,
  AIInputModelSelectTrigger,
  AIInputModelSelectValue,
  AIInputSubmit,
  AIInputTextarea,
  AIInputToolbar,
  AIInputTools,
} from "@/components/ui/ai/input";
import { Image02Icon, Mic02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { useChatStoreContext } from "./chat-context";

const models = [
  { id: "gpt-4", name: "GPT-4" },
  { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo" },
  { id: "claude-2", name: "Claude 2" },
  { id: "claude-instant", name: "Claude Instant" },
  { id: "palm-2", name: "PaLM 2" },
  { id: "llama-2-70b", name: "Llama 2 70B" },
  { id: "llama-2-13b", name: "Llama 2 13B" },
  { id: "cohere-command", name: "Command" },
  { id: "mistral-7b", name: "Mistral 7B" },
];

const ChatInput = () => {
  const { input, setInput, sendMessage, status } = useChatStoreContext();

  const valueIsEmpty = input.trim() === "";
  const submitDisabled = valueIsEmpty || status === "submitted";
  const canSendMessage = !submitDisabled && status !== "streaming";
  const [model, setModel] = useState<string>(models[0].id);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (canSendMessage) {
      sendMessage({ text: input });
      setInput("");
    }
  };

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setInput(event.target.value);
  };

  return (
    <div className="pb-2 overflow-y-auto [scrollbar-gutter:stable_both-edges]">
      <div className="container max-w-3xl mx-auto w-full ">
        <AIInput onSubmit={handleSubmit}>
          <AIInputTextarea
            canSubmit={canSendMessage}
            onChange={handleChange}
            value={input}
            placeholder="Ask anything"
          />
          <AIInputToolbar>
            <AIInputTools>
              <AIInputModelSelect onValueChange={setModel} value={model}>
                <AIInputModelSelectTrigger>
                  <AIInputModelSelectValue />
                </AIInputModelSelectTrigger>
                <AIInputModelSelectContent>
                  {models.map((model) => (
                    <AIInputModelSelectItem key={model.id} value={model.id}>
                      {model.name}
                    </AIInputModelSelectItem>
                  ))}
                </AIInputModelSelectContent>
              </AIInputModelSelect>
            </AIInputTools>
            <AIInputTools>
              <AIInputButton>
                <HugeiconsIcon strokeWidth={1.5} icon={Image02Icon} />
              </AIInputButton>
              <AIInputButton>
                <HugeiconsIcon strokeWidth={1.5} icon={Mic02Icon} />
              </AIInputButton>
              <AIInputSubmit disabled={submitDisabled} status={status} />
            </AIInputTools>
          </AIInputToolbar>
        </AIInput>
      </div>
    </div>
  );
};
export default ChatInput;
