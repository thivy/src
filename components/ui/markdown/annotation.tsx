import { Root } from "mdast";
import { visit } from "unist-util-visit";

export function remarkAnnotation() {
  return (tree: Root) => {
    visit(tree, (node) => {
      // Handle inline annotations: :annotation[text]{url="https://example.com" index="1"}
      if (node.type === "textDirective" && node.name === "annotation") {
        node.data = {
          hName: "a",
          hProperties: {
            "data-url": node.attributes?.url,
            "data-index": node.attributes?.index,
            "data-type": node.name,
          },
        };
      }
    });
  };
}
