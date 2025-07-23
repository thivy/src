"use client";

import { cn } from "@/components/lib/utils";
import { Button } from "@/components/ui/button";
import { Copy01Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import {
  transformerNotationDiff,
  transformerNotationErrorLevel,
  transformerNotationFocus,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from "@shikijs/transformers";
import type {
  ComponentProps,
  HTMLAttributes,
  PropsWithChildren,
  ReactElement,
  ReactNode,
} from "react";
import { cloneElement, useEffect, useState } from "react";
import {
  type BundledLanguage,
  type CodeOptionsMultipleThemes,
  codeToHtml,
} from "shiki";

export type { BundledLanguage } from "shiki";

const lineNumberClassNames = cn(
  "[&_code]:[counter-reset:line]",
  "[&_code]:[counter-increment:line_0]",
  "[&_.line]:before:content-[counter(line)]",
  "[&_.line]:before:inline-block",
  "[&_.line]:before:[counter-increment:line]",
  "[&_.line]:before:w-4",
  "[&_.line]:before:mr-4",
  "[&_.line]:before:text-[13px]",
  "[&_.line]:before:text-right",
  "[&_.line]:before:text-muted-foreground/50",
  "[&_.line]:before:font-mono",
  "[&_.line]:before:select-none"
);

const darkModeClassNames = cn(
  "dark:[&_.shiki]:!text-[var(--shiki-dark)]",
  "dark:[&_.shiki]:!bg-[var(--shiki-dark-bg)]",
  "dark:[&_.shiki]:![font-style:var(--shiki-dark-font-style)]",
  "dark:[&_.shiki]:![font-weight:var(--shiki-dark-font-weight)]",
  "dark:[&_.shiki]:![text-decoration:var(--shiki-dark-text-decoration)]",
  "dark:[&_.shiki_span]:!text-[var(--shiki-dark)]",
  "dark:[&_.shiki_span]:![font-style:var(--shiki-dark-font-style)]",
  "dark:[&_.shiki_span]:![font-weight:var(--shiki-dark-font-weight)]",
  "dark:[&_.shiki_span]:![text-decoration:var(--shiki-dark-text-decoration)]"
);

const lineHighlightClassNames = cn(
  "[&_.line.highlighted]:bg-blue-50",
  "[&_.line.highlighted]:after:bg-blue-500",
  "[&_.line.highlighted]:after:absolute",
  "[&_.line.highlighted]:after:left-0",
  "[&_.line.highlighted]:after:top-0",
  "[&_.line.highlighted]:after:bottom-0",
  "[&_.line.highlighted]:after:w-0.5",
  "dark:[&_.line.highlighted]:!bg-blue-500/10"
);

const lineDiffClassNames = cn(
  "[&_.line.diff]:after:absolute",
  "[&_.line.diff]:after:left-0",
  "[&_.line.diff]:after:top-0",
  "[&_.line.diff]:after:bottom-0",
  "[&_.line.diff]:after:w-0.5",
  "[&_.line.diff.add]:bg-emerald-50",
  "[&_.line.diff.add]:after:bg-emerald-500",
  "[&_.line.diff.remove]:bg-rose-50",
  "[&_.line.diff.remove]:after:bg-rose-500",
  "dark:[&_.line.diff.add]:!bg-emerald-500/10",
  "dark:[&_.line.diff.remove]:!bg-rose-500/10"
);

const lineFocusedClassNames = cn(
  "[&_code:has(.focused)_.line]:blur-[2px]",
  "[&_code:has(.focused)_.line.focused]:blur-none"
);

const wordHighlightClassNames = cn(
  "[&_.highlighted-word]:bg-blue-50",
  "dark:[&_.highlighted-word]:!bg-blue-500/10"
);

const codeBlockClassName = cn(
  "mt-0",
  "[&_pre]:pt-4",
  "[&_.shiki]:!bg-[var(--shiki-bg)]",
  "[&_code]:w-full",
  "[&_code]:grid",
  "[&_code]:overflow-x-auto",
  "[&_code]:bg-transparent",
  "[&_.line]:px-1",
  "[&_.line]:w-full",
  "[&_.line]:relative"
);

const highlight = (
  html: string,
  language?: BundledLanguage,
  themes?: CodeOptionsMultipleThemes["themes"]
) =>
  codeToHtml(html, {
    lang: language ?? "typescript",
    themes: themes ?? {
      light: "min-light",
      dark: "min-dark",
    },
    colorReplacements: {
      "min-dark": {
        "#1f1f1f": "transparent", // Replace background
      },
      "min-light": {
        "#ffffff": "transparent", // Replace light background
      },
    },
    transformers: [
      transformerNotationDiff({
        matchAlgorithm: "v3",
      }),
      transformerNotationHighlight({
        matchAlgorithm: "v3",
      }),
      transformerNotationWordHighlight({
        matchAlgorithm: "v3",
      }),
      transformerNotationFocus({
        matchAlgorithm: "v3",
      }),
      transformerNotationErrorLevel({
        matchAlgorithm: "v3",
      }),
    ],
  });

export type CodeBlockProps = HTMLAttributes<HTMLDivElement> & {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  code: string;
  language: string;
};

export const CodeBlock = ({ className, ...props }: CodeBlockProps) => {
  return (
    <div
      className={cn(
        "size-full overflow-hidden rounded-md border bg-slate-50/50 dark:bg-black/10",
        className
      )}
      {...props}
    />
  );
};

export type CodeBlockHeaderProps = HTMLAttributes<HTMLDivElement>;

export const CodeBlockHeader = ({
  className,
  ...props
}: CodeBlockHeaderProps) => (
  <div className={cn("flex flex-row items-center p-1", className)} {...props} />
);

export type CodeBlockFilenameProps = HTMLAttributes<HTMLDivElement> & {
  value?: string;
};

export const CodeBlockFilename = ({
  className,
  children,
  ...props
}: CodeBlockFilenameProps) => {
  return (
    <div
      className={cn(
        "flex justify-between flex-1 gap-2 px-4 py-1.5 text-xs",
        className
      )}
      {...props}
    >
      <span className="flex-1 truncate">{children}</span>
    </div>
  );
};

export type CodeBlockCopyButtonProps = ComponentProps<typeof Button> & {
  onCopy?: () => void;
  onError?: (error: Error) => void;
  timeout?: number;
  code?: string;
};

export const CodeBlockCopyButton = ({
  asChild,
  onCopy,
  onError,
  timeout = 2000,
  code,
  children,
  className,
  ...props
}: CodeBlockCopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    if (
      typeof window === "undefined" ||
      !navigator.clipboard.writeText ||
      !code
    ) {
      return;
    }

    navigator.clipboard.writeText(code).then(() => {
      setIsCopied(true);
      onCopy?.();

      setTimeout(() => setIsCopied(false), timeout);
    }, onError);
  };

  if (asChild) {
    return cloneElement(children as ReactElement, {
      // @ts-expect-error - we know this is a button
      onClick: copyToClipboard,
    });
  }

  const Icon: ReactNode = isCopied ? (
    <HugeiconsIcon icon={Tick02Icon} />
  ) : (
    <HugeiconsIcon icon={Copy01Icon} />
  );

  return (
    <Button
      className={cn("shrink-0", className)}
      onClick={copyToClipboard}
      size="icon"
      variant="ghost"
      {...props}
    >
      {children ?? Icon}
    </Button>
  );
};

type CodeBlockFallbackProps = HTMLAttributes<HTMLDivElement>;

const CodeBlockFallback = ({ children, ...props }: CodeBlockFallbackProps) => (
  <div {...props}>
    <pre className="w-full">
      <code>
        {children
          ?.toString()
          .split("\n")
          .map((line, i) => (
            <span className="line" key={i}>
              {line}
            </span>
          ))}
      </code>
    </pre>
  </div>
);

export const CodeBlockBody = ({ children, ...props }: PropsWithChildren) => {
  return <div {...props}>{children}</div>;
};

export type CodeBlockItemProps = HTMLAttributes<HTMLDivElement> & {
  value: string;
  lineNumbers?: boolean;
};

export const CodeBlockItem = ({
  children,
  lineNumbers = true,
  className,
  ...props
}: CodeBlockItemProps) => {
  return (
    <div
      className={cn(
        codeBlockClassName,
        lineHighlightClassNames,
        lineDiffClassNames,
        lineFocusedClassNames,
        wordHighlightClassNames,
        darkModeClassNames,
        lineNumbers && lineNumberClassNames,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export type CodeBlockContentProps = HTMLAttributes<HTMLDivElement> & {
  themes?: CodeOptionsMultipleThemes["themes"];
  language?: BundledLanguage;
  syntaxHighlighting?: boolean;
  children: string;
};

export const CodeBlockContent = ({
  children,
  themes,
  language,
  syntaxHighlighting = true,
  ...props
}: CodeBlockContentProps) => {
  const [html, setHtml] = useState<string | null>(null);

  // Use useEffect to handle the async highlighting
  useEffect(() => {
    if (!syntaxHighlighting) {
      console.warn("Syntax highlighting is disabled.");
      setHtml(null);
      return;
    }

    const highlightCode = async () => {
      try {
        const code = await highlight(children, language, themes);
        setHtml(code);
      } catch {
        // ignore any highlighting error
        setHtml(null);
      }
    };

    highlightCode();
  }, [children, language, themes, syntaxHighlighting]);

  if (!(syntaxHighlighting && html)) {
    return <CodeBlockFallback>{children}</CodeBlockFallback>;
  }

  return <div dangerouslySetInnerHTML={{ __html: html }} {...props} />;
};
