"use client";

import { MessageCircleMore } from "lucide-react";
import { NodeProps, Position } from "reactflow";
import CustomHandle from "./custom-handle";

type Props = NodeProps<{ label: string; text: string }>;

const TextMessage = (props: Props) => {
  // Extract selected props to style selected node
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

      <CustomHandle type="target" position={Position.Left} />
      <CustomHandle
        type="source"
        position={Position.Right}
        connectable={({ node, connectedEdges }) => {
          // Here we will keep the count of the source id of the edge and node id are equal.
          let count = 0;
          for (let i = 0; i < connectedEdges.length; ++i) {
            if (connectedEdges[i]?.source === node.id) {
              count++;
            }
          }
          // If count is 0 then we can create connection from source, otherwise we will return false so there will be only one source handle
          return count === 0;
        }}
      />
    </div>
  );
};

export default TextMessage;
