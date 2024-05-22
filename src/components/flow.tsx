"use client";

import { DragEvent, useCallback, useState } from "react";
import ReactFlow, {
  Background,
  Connection,
  Controls,
  ReactFlowInstance,
  ReactFlowProvider,
  addEdge,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";

import TextMessage from "@/components/text-message";
import Sidebar from "./sidebar";
import { initialEdges, initialNodes } from "@/constants";
import Header from "./header";

// Add all custom node to nodeTypes
const nodeTypes = {
  textMessage: TextMessage,
};

const Flow = () => {
  // Pass initial values of nodes and edges
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Will use this rf instance to extract position of the dropped node in drag and drop operation
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance<
    any,
    any
  > | null>(null);

  // We use this onConnect method to convert connection into edge
  const onConnect = useCallback(
    (connection: Connection) => {
      const edge = { ...connection, animated: true, id: `${edges.length + 1}` };
      setEdges((prevEdges) => addEdge(edge, prevEdges));
    },
    [edges, setEdges]
  );

  // This method will be called after darg is over
  const onDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();

      // We use this DataTransfer object to hold data related to drag and drop event, We used it to store node type
      const type = e.dataTransfer.getData("application/reactflow");

      if (typeof type === "undefined" || !type || !reactFlowInstance) {
        return;
      }

      // Extract node position
      const position = reactFlowInstance.screenToFlowPosition({
        x: e.clientX,
        y: e.clientY,
      });

      // Create new node
      const newNode = {
        id: `${nodes.length + 1}`,
        type,
        position,
        data: {
          label: "Send Message",
          text: "New Node",
        },
      };

      // Add new created node to nodes array
      setNodes((prevNodes) => prevNodes.concat(newNode));
    },
    [reactFlowInstance, nodes.length, setNodes]
  );

  return (
    <ReactFlowProvider>
      <div className="reactflow-container">
        <Header />
        <div className="reactflow-wrapper">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onInit={setReactFlowInstance}
          >
            <Background />
            <Controls />
          </ReactFlow>
        </div>
        <Sidebar />
      </div>
    </ReactFlowProvider>
  );
};

export default Flow;
