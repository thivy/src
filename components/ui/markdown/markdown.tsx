"use client";

import "katex/dist/katex.min.css";
import { FC } from "react";
import ReactMarkdown from "react-markdown";

import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { components } from "./markdown-nodes";

interface Props {
  content: string;
}

import remarkDirective from "remark-directive";
import { remarkAnnotation } from "./annotation";

export const Markdown: FC<Props> = (props) => {
  return (
    <ReactMarkdown
      components={components}
      rehypePlugins={[rehypeKatex]}
      remarkPlugins={[remarkGfm, remarkMath, remarkAnnotation, remarkDirective]}
    >
      {props.content}
    </ReactMarkdown>
  );
};
