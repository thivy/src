"use client";

import { cn } from "@/components/lib/utils";
import { ArrowDown01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { ComponentProps } from "react";
import { useCallback } from "react";
import { StickToBottom, useStickToBottomContext } from "use-stick-to-bottom";
import { Button } from "../button";

export type AIConversationProps = ComponentProps<typeof StickToBottom>;

export const AIConversation = ({
  className,
  ...props
}: AIConversationProps) => (
  <StickToBottom
    className={cn("relative flex-1 overflow-hidden", className)}
    initial="smooth"
    resize="smooth"
    role="log"
    {...props}
  />
);

export type AIConversationContentProps = ComponentProps<
  typeof StickToBottom.Content
>;

export const AIConversationContent = ({
  className,
  ...props
}: AIConversationContentProps) => (
  <StickToBottom.Content className={cn(className)} {...props} />
);

export const AIConversationScrollButton = () => {
  const { isAtBottom, scrollToBottom } = useStickToBottomContext();

  const handleScrollToBottom = useCallback(() => {
    scrollToBottom();
  }, [scrollToBottom]);

  return (
    !isAtBottom && (
      <Button
        className="absolute bottom-4 left-[50%] translate-x-[-50%] rounded-full"
        onClick={handleScrollToBottom}
        size="icon"
        type="button"
        variant="default"
      >
        <HugeiconsIcon icon={ArrowDown01Icon} strokeWidth={1.5} />
      </Button>
    )
  );
};
