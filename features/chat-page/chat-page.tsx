"use client";
import {
  AIInput,
  AIInputButton,
  AIInputSubmit,
  AIInputTextarea,
  AIInputToolbar,
  AIInputTools,
} from "@/components/ui/ai-input/input";
import {
  ArrowUpIcon,
  ImageIcon,
  MapPinIcon,
  MicIcon,
  PaperclipIcon,
  SearchIcon,
} from "lucide-react";
import { type FormEventHandler, useState } from "react";
const Example = () => {
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

  return (
    <AIInput onSubmit={handleSubmit}>
      <AIInputTextarea
        onChange={(e) => setText(e.target.value)}
        value={text}
        placeholder="Ask anything or @ mention a Space"
      />
      <AIInputToolbar>
        <AIInputTools>
          <AIInputButton>
            <SearchIcon size={16} />
          </AIInputButton>
          <AIInputButton>
            <PaperclipIcon size={16} />
          </AIInputButton>
          <AIInputButton>
            <MapPinIcon size={16} />
          </AIInputButton>
        </AIInputTools>
        <div className="flex items-center gap-1">
          <AIInputButton>
            <ImageIcon size={16} />
          </AIInputButton>
          <AIInputButton>
            <MicIcon size={16} />
          </AIInputButton>
          <AIInputSubmit disabled={!text} status={status}>
            <ArrowUpIcon size={22} />
          </AIInputSubmit>
        </div>
      </AIInputToolbar>
    </AIInput>
  );
};
export default Example;
