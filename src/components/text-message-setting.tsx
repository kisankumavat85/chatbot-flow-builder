"use client";

import { Node, useReactFlow } from "reactflow";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { ChangeEvent, memo, useCallback, useEffect, useState } from "react";

type Props = {
  node: Node;
};

// This component will be rendered when any node is selected, With the help of this compo. we can change content of the node
const TextMessageSetting = ({ node }: Props) => {
  const [message, setMessage] = useState(node.data.text);
  const { setNodes } = useReactFlow();

  const onChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setNodes((nodes) => {
        return nodes.map((n) => {
          if (n.id === node.id) {
            return {
              ...n,
              data: {
                ...n.data,
                text: e.target.value,
              },
            };
          }
          return n;
        });
      });
      setMessage(e.target.value);
    },
    [setMessage, setNodes, node.id]
  );

  useEffect(() => setMessage(node.data.text), [node.data]);

  return (
    <div>
      <p className="text-center py-2 border-b">Message</p>
      <div className="p-4">
        <Label htmlFor="message">Text</Label>
        <Textarea id="message" value={message} onChange={onChange} />
      </div>
    </div>
  );
};

export default memo(TextMessageSetting);
