import { Edge, Node } from "reactflow";

export const initialNodes: Node[] = [
  {
    id: "1",
    data: {
      label: "Send Message",
      text: "Text message 1",
    },
    position: { x: 50, y: 50 },
    type: "textMessage",
  },
  {
    id: "2",
    data: {
      label: "Send Message",
      text: "Text message 2",
    },
    position: { x: 250, y: 150 },
    type: "textMessage",
  },
  {
    id: "3",
    data: {
      label: "Send Message",
      text: "Text message 3",
    },
    position: { x: 350, y: 150 },
    type: "textMessage",
  },
];

export const initialEdges: Edge[] = [
  {
    id: "1-2",
    source: "1",
    target: "2",
    animated: true,
  },
];
