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
} from "@/components/ai/input";
import { Image02Icon, Mic02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUpIcon } from "lucide-react";
import { type FormEventHandler, useState } from "react";

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
  const [text, setText] = useState<string>("");
  const [status, setStatus] = useState<
    "submitted" | "streaming" | "ready" | "error"
  >("ready");

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (!text) {
      return;
    }
    setStatus("submitted");
    setTimeout(() => {
      setStatus("streaming");
    }, 200);
    setTimeout(() => {
      setStatus("ready");
    }, 2000);
  };
  const [model, setModel] = useState<string>(models[0].id);

  return (
    <div className="pb-2 overflow-y-auto [scrollbar-gutter:auto] @3xl:[scrollbar-gutter:stable]">
      <div className="container max-w-3xl mx-auto w-full ">
        <AIInput onSubmit={handleSubmit}>
          <AIInputTextarea
            onChange={(e) => setText(e.target.value)}
            value={text}
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

              <AIInputSubmit disabled={!text} status={status}>
                <ArrowUpIcon size={22} />
              </AIInputSubmit>
            </AIInputTools>
          </AIInputToolbar>
        </AIInput>
      </div>
    </div>
  );
};
export default ChatInput;
