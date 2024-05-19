"use client";

import { MessageCircleMore } from "lucide-react";
import { Handle, NodeProps, Position } from "reactflow";

type Props = NodeProps<{ label: string; text: string }>;

const TextMessage = (props: Props) => {
  const { data, selected } = props;

  return (
    <div>
      <div
        className={`border rounded-lg shadow-lg flex flex-col w-fit min-w-[200px] overflow-hidden ${
          selected && "border-gray-400"
        }`}
      >
        <p className="px-4 py-2 text-center text-sm bg-blue-600 text-white flex items-center gap-1">
          <MessageCircleMore className="h-4 w-4" /> {data.label}
        </p>
        <div className="px-4 py-2 bg-white">{data.text}</div>
      </div>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

export default TextMessage;
