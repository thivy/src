"use client";

import { cn } from "@/components/lib/utils";
import type { HTMLAttributes } from "react";
import { memo } from "react";
import { type Options } from "react-markdown";
import { Button } from "../button";
import { ReactMarkdown } from "../markdown/remark";
import { ShimmeringText, ShimmeringTextProps } from "../shimmering";
import { AIMessage } from "./message";

export type AIResponseProps = HTMLAttributes<HTMLDivElement> & {
  options?: Options;
  children: Options["children"];
};

export const AIResponse = memo(
  ({ className, options, children, ...props }: AIResponseProps) => (
    <div
      className={cn(
        "size-full [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 max-w-none",
        className
      )}
      {...props}
    >
      <ReactMarkdown {...options}>{children}</ReactMarkdown>
    </div>
  ),
  (prevProps, nextProps) => prevProps.children === nextProps.children
);

AIResponse.displayName = "AIResponse";

type Props = {
  status: "submitted" | "streaming" | "ready" | "error";
} & ShimmeringTextProps;

export const AIResponseLoading = ({ status, ...props }: Props) => {
  if (status === "streaming" || status === "submitted") {
    return (
      <AIMessage from="assistant">
        <ShimmeringText {...props} />
      </AIMessage>
    );
  }
  return null;
};

AIResponseLoading.displayName = "AIResponseLoading";

type AIResponseErrorProps = {
  error: Error | undefined;
  reload: () => void;
};

export const AIResponseError = ({ error, reload }: AIResponseErrorProps) => {
  if (!error) {
    return null;
  }

  return (
    <AIMessage from="error" className="text-sm flex-col">
      <p className="text-destructive">
        {error ? error.message : "Unknown error"}
      </p>
      <Button onClick={() => reload()} size={"sm"} variant={"outline"}>
        Retry
      </Button>
    </AIMessage>
  );
};

AIResponseError.displayName = "AIResponseError";
