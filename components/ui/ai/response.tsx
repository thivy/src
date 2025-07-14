"use client";

import { cn } from "@/components/lib/utils";
import type { HTMLAttributes } from "react";
import { memo } from "react";
import { type Options } from "react-markdown";
import { ReactMarkdown } from "../markdown/remark";
import { ShimmeringText, ShimmeringTextProps } from "../shimmering";

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
      <div className="container max-w-3xl mx-auto px-2 @3xl:px-0">
        <ShimmeringText {...props} />
      </div>
    );
  }
  return null;
};

AIResponseLoading.displayName = "AIResponseLoading";
