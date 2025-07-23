"use client";

import Markdoc from "@markdoc/markdoc";
import React from "react";

import { FC } from "react";
import {
  Anchor,
  componentConfig,
  CustomCodeBlock,
  Hr,
  Image,
  List,
  Paragraph,
  Strong,
} from "./markdoc-nodes";

interface Props {
  content: string;
}

export const MarkdocMarkdown: FC<Props> = (props) => {
  const ast = Markdoc.parse(props.content);

  const content = Markdoc.transform(ast, {
    ...componentConfig,
  });

  return (
    <>
      {Markdoc.renderers.react(content, React, {
        components: {
          CustomCodeBlock,
          Paragraph,
          Hr,
          Image,
          Anchor,
          Strong,
          List,
        },
      })}
    </>
  );
};
