"use client";

import { cn } from "@/components/lib/utils";
import { HTMLAttributes } from "react";
import { Options } from "react-markdown";
import { Annotation } from "../annotation";
import {
  BundledLanguage,
  CodeBlock,
  CodeBlockBody,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockFilename,
  CodeBlockHeader,
  CodeBlockItem,
} from "./code-block";

export type AIResponseProps = HTMLAttributes<HTMLDivElement> & {
  options?: Options;
  children: Options["children"];
};

export const components: Options["components"] = {
  p: ({ node, children, className, ...props }) => (
    <p className={cn("my-4", className)} {...props}>
      {children}
    </p>
  ),
  hr: ({ className, ...props }) => (
    <hr className={cn("my-4 border-t", className)} {...props} />
  ),
  ol: ({ node, children, className, ...props }) => (
    <ol className={cn("ml-4 list-outside list-decimal", className)} {...props}>
      {children}
    </ol>
  ),
  li: ({ node, children, className, ...props }) => (
    <li className={cn("py-1", className)} {...props}>
      {children}
    </li>
  ),
  ul: ({ node, children, className, ...props }) => (
    <ul className={cn("ml-4 list-outside list-decimal", className)} {...props}>
      {children}
    </ul>
  ),
  strong: ({ node, children, className, ...props }) => (
    <span className={cn("font-semibold", className)} {...props}>
      {children}
    </span>
  ),
  a: ({ node, children, className, ...props }) => {
    const url = props["data-url" as keyof typeof props];
    const index = props["data-index" as keyof typeof props];
    const type = props["data-type" as keyof typeof props];

    if (node && type === "annotation") {
      return (
        <Annotation href={url} title={children as string}>
          {index}
        </Annotation>
      );
    }

    return (
      <a
        className={cn("font-medium underline", className)}
        rel="noreferrer"
        target="_blank"
        {...props}
      >
        {children}
      </a>
    );
  },
  h1: ({ node, children, className, ...props }) => (
    <h1
      className={cn("mt-6 mb-2 font-semibold text-3xl", className)}
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ node, children, className, ...props }) => (
    <h2
      className={cn("mt-6 mb-2 font-semibold text-2xl", className)}
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ node, children, className, ...props }) => (
    <h3 className={cn("mt-6 mb-2 font-semibold text-xl", className)} {...props}>
      {children}
    </h3>
  ),
  h4: ({ node, children, className, ...props }) => (
    <h4 className={cn("mt-6 mb-2 font-semibold text-lg", className)} {...props}>
      {children}
    </h4>
  ),
  h5: ({ node, children, className, ...props }) => (
    <h5
      className={cn("mt-6 mb-2 font-semibold text-base", className)}
      {...props}
    >
      {children}
    </h5>
  ),
  h6: ({ node, children, className, ...props }) => (
    <h6 className={cn("mt-6 mb-2 font-semibold text-sm", className)} {...props}>
      {children}
    </h6>
  ),
  pre: ({ node, className, children }) => {
    let language = "javascript";
    if (typeof node?.properties?.className === "string") {
      language = node.properties.className.replace("language-", "");
    }
    const childrenIsCode =
      typeof children === "object" &&
      children !== null &&
      "type" in children &&
      children.type === "code";
    if (!childrenIsCode) {
      return <pre>{children}</pre>;
    }
    const code = (children.props as { children: string }).children;
    return (
      <CodeBlock
        className={cn("my-4 h-auto", "className")}
        language={language}
        filename={language}
        defaultValue={language}
      >
        <CodeBlockHeader>
          <CodeBlockFilename key={language} value={language}>
            {language}
          </CodeBlockFilename>

          <CodeBlockCopyButton
            onCopy={() => console.log("Copied code to clipboard")}
            onError={() => console.error("Failed to copy code to clipboard")}
          />
        </CodeBlockHeader>
        <CodeBlockBody>
          <CodeBlockItem value={language}>
            <CodeBlockContent language={language as BundledLanguage}>
              {code}
            </CodeBlockContent>
          </CodeBlockItem>
        </CodeBlockBody>
      </CodeBlock>
    );
  },
};
