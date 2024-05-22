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

const nodeTypes = {
  textMessage: TextMessage,
};

const Flow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance<
    any,
    any
  > | null>(null);

  const onConnect = useCallback(
    (connection: Connection) => {
      const edge = { ...connection, animated: true, id: `${edges.length + 1}` };
      setEdges((prevEdges) => addEdge(edge, prevEdges));
    },
    [edges, setEdges]
  );

  const onDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const type = e.dataTransfer.getData("application/reactflow");

      if (typeof type === "undefined" || !type || !reactFlowInstance) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: e.clientX,
        y: e.clientY,
      });

      const newNode = {
        id: `${nodes.length + 1}`,
        type,
        position,
        data: {
          label: "Send Message",
          text: "New Node",
        },
      };

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
