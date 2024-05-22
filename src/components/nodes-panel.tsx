import { useCallback } from "react";
import { MessageCircleMore } from "lucide-react";

const NodesPanel = () => {
  const onDragstart = useCallback(
    (e: React.DragEvent<HTMLLIElement>, nodeType: string) => {
      // On drag start event we store nodeType using DataTransfer object
      e.dataTransfer.setData("application/reactflow", nodeType);
      e.dataTransfer.effectAllowed = "move";
    },
    []
  );

  return (
    <ul className="grid grid-cols-2 gap-2 p-4">
      <li
        className="border border-blue-600 rounded-md text-blue-600 p-3 flex flex-col gap-2 items-center"
        draggable
        onDragStart={(e) => onDragstart(e, "textMessage")}
      >
        <MessageCircleMore className="w-6 h-6" />
        <span>Message</span>
      </li>
    </ul>
  );
};

export default NodesPanel;
