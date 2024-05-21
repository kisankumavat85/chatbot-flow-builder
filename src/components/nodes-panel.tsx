import { MessageCircleMore } from "lucide-react";
import { useCallback } from "react";

const NodesPanel = () => {
  const onDragstart = useCallback(
    (e: React.DragEvent<HTMLDivElement>, nodeType: string) => {
      console.log("first");
      e.dataTransfer.setData("application/reactflow", nodeType);
      e.dataTransfer.effectAllowed = "move";
    },
    []
  );

  return (
    <div className="grid grid-cols-2 gap-2">
      <div
        className="border border-blue-600 rounded-md text-blue-600 p-3 flex flex-col gap-2 items-center"
        draggable
        onDragStart={(e) => onDragstart(e, "textMessage")}
      >
        <MessageCircleMore className="w-6 h-6" />
        <span>Message</span>
      </div>
    </div>
  );
};

export default NodesPanel;
