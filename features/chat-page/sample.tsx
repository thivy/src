"use client";

import { useChat } from "@ai-sdk/react";

export default function SamplePage() {
  const { messages, append } = useChat({});
  return (
    <>
      {messages.map((message) => (
        <div key={message.id}>
          {message.role === "user" ? "User: " : "AI: "}
          {message.parts.map((part, index) =>
            part.type === "text" ? <span key={index}>{part.text}</span> : null
          )}
        </div>
      ))}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          const prompt = formData.get("prompt") as string;
          append({
            role: "user",
            parts: [{ type: "text", text: prompt }],
          });
        }}
      >
        <input name="prompt" />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
