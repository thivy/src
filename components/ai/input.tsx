"use client";
import { cn } from "@/components/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUpIcon, Loader2Icon, SquareIcon, XIcon } from "lucide-react";
import type {
  ComponentProps,
  HTMLAttributes,
  KeyboardEventHandler,
} from "react";
import { Children, useCallback, useEffect, useRef } from "react";
type UseAutoResizeTextareaProps = {
  minHeight: number;
  maxHeight?: number;
};

const useAutoResizeTextarea = ({
  minHeight,
  maxHeight,
}: UseAutoResizeTextareaProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const adjustHeight = useCallback(
    (reset?: boolean) => {
      const textarea = textareaRef.current;
      if (!textarea) {
        return;
      }
      if (reset) {
        textarea.style.height = `${minHeight}px`;
        return;
      }
      // Temporarily shrink to get the right scrollHeight
      textarea.style.height = `${minHeight}px`;
      // Calculate new height
      const newHeight = Math.max(
        minHeight,
        Math.min(textarea.scrollHeight, maxHeight ?? Number.POSITIVE_INFINITY)
      );
      textarea.style.height = `${newHeight}px`;
    },
    [minHeight, maxHeight]
  );
  useEffect(() => {
    // Set initial height
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = `${minHeight}px`;
    }
  }, [minHeight]);
  // Adjust height on window resize
  useEffect(() => {
    const handleResize = () => adjustHeight();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [adjustHeight]);
  return { textareaRef, adjustHeight };
};

export type AIInputProps = HTMLAttributes<HTMLFormElement>;
export const AIInput = ({ className, ...props }: AIInputProps) => (
  <form
    className={cn(
      "w-full backdrop-blur-2xl overflow-hidden rounded-xl border border-border/50 focus-within:border-border bg-input/90 focus-within:bg-input transition-colors duration-300",
      className
    )}
    {...props}
  />
);
export type AIInputTextareaProps = ComponentProps<typeof Textarea> & {
  minHeight?: number;
  maxHeight?: number;
};
export const AIInputTextarea = ({
  onChange,
  className,
  placeholder = "",
  minHeight = 48,
  maxHeight = 164,
  ...props
}: AIInputTextareaProps) => {
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight,
    maxHeight,
  });
  const handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      const form = e.currentTarget.form;
      if (form) {
        form.requestSubmit();
      }
    }
  };
  return (
    <Textarea
      className={cn(
        "w-full resize-none rounded-none border-none p-4 pb-0 shadow-none outline-none ring-0",
        "bg-transparent dark:bg-transparent text-foreground placeholder:text-muted-foreground",
        "focus-visible:ring-0 focus-visible:outline-none",
        className
      )}
      autoComplete="off"
      autoCorrect="off"
      autoFocus
      spellCheck="false"
      name="message"
      onChange={(e) => {
        adjustHeight();
        onChange?.(e);
      }}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      ref={textareaRef}
      {...props}
    />
  );
};
export type AIInputToolbarProps = HTMLAttributes<HTMLDivElement>;
export const AIInputToolbar = ({
  className,
  ...props
}: AIInputToolbarProps) => (
  <div
    className={cn("flex items-center justify-between px-4 py-3", className)}
    {...props}
  />
);
export type AIInputToolsProps = HTMLAttributes<HTMLDivElement>;
export const AIInputTools = ({ className, ...props }: AIInputToolsProps) => (
  <div className={cn("flex items-center gap-1", className)} {...props} />
);
export type AIInputButtonProps = ComponentProps<typeof Button>;
export const AIInputButton = ({
  variant = "ghost",
  className,
  size,
  ...props
}: AIInputButtonProps) => {
  const newSize =
    size ?? Children.count(props.children) > 1 ? "default" : "icon";
  return (
    <Button
      className={cn(
        "shrink-0 gap-1.5 rounded-lg size-9",
        variant === "ghost" &&
          "text-foreground hover:text-foreground dark:hover:bg-accent",
        "disabled:text-muted-foreground",
        newSize === "default" && "px-3 w-auto",
        className
      )}
      size={newSize}
      type="button"
      variant={variant}
      {...props}
    />
  );
};
export type AIInputSubmitProps = ComponentProps<typeof Button> & {
  status?: "submitted" | "streaming" | "ready" | "error";
};
export const AIInputSubmit = ({
  className,
  variant = "default",
  size = "icon",
  status,
  children,
  ...props
}: AIInputSubmitProps) => {
  let Icon = <ArrowUpIcon />;
  if (status === "submitted") {
    Icon = <Loader2Icon className="animate-spin" />;
  } else if (status === "streaming") {
    Icon = <SquareIcon />;
  } else if (status === "error") {
    Icon = <XIcon />;
  }
  return (
    <Button
      className={cn(
        "gap-1.5 rounded-full size-9 bg-primary/80 hover:bg-primary/30 text-input/80 hover:text-primary/80",
        "disabled:bg-primary/30 disabled:text-primary/80 disabled:pointer-events-none",
        className
      )}
      size={size}
      type="submit"
      variant={variant}
      {...props}
    >
      {children ?? Icon}
    </Button>
  );
};
export type AIInputModelSelectProps = ComponentProps<typeof Select>;
export const AIInputModelSelect = (props: AIInputModelSelectProps) => (
  <Select {...props} />
);
export type AIInputModelSelectTriggerProps = ComponentProps<
  typeof SelectTrigger
>;
export const AIInputModelSelectTrigger = ({
  className,
  ...props
}: AIInputModelSelectTriggerProps) => (
  <SelectTrigger
    className={cn(
      "text-xs border-none bg-transparent font-medium text-primary/80 shadow-none transition-colors",
      'dark:bg-transparent dark:hover:bg-accent hover:text-foreground [&[aria-expanded="true"]]:bg-accent [&[aria-expanded="true"]]:text-foreground',
      className
    )}
    {...props}
  />
);
export type AIInputModelSelectContentProps = ComponentProps<
  typeof SelectContent
>;
export const AIInputModelSelectContent = ({
  className,
  ...props
}: AIInputModelSelectContentProps) => (
  <SelectContent className={cn(className)} {...props} />
);
export type AIInputModelSelectItemProps = ComponentProps<typeof SelectItem>;
export const AIInputModelSelectItem = ({
  className,
  ...props
}: AIInputModelSelectItemProps) => (
  <SelectItem className={cn(className)} {...props} />
);
export type AIInputModelSelectValueProps = ComponentProps<typeof SelectValue>;
export const AIInputModelSelectValue = ({
  className,
  ...props
}: AIInputModelSelectValueProps) => (
  <SelectValue className={cn(className)} {...props} />
);
