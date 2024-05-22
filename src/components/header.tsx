import { useCallback } from "react";
import { ReactFlowJsonObject, useReactFlow } from "reactflow";

import { useToast } from "./ui/use-toast";
import { Button } from "./ui/button";

const Header = () => {
  const { toObject, getNodes, getEdges, setNodes, setEdges } = useReactFlow();
  const { toast } = useToast();

  const onSaveClick = useCallback(() => {
    const nodesIds = getNodes().map((n) => n.id);

    const edgesSet = new Set();

    getEdges().forEach((e) => {
      edgesSet.add(e.source);
      edgesSet.add(e.target);
    });

    let isValid = false;

    for (let i = 0; i < nodesIds.length; i++) {
      isValid = edgesSet.has(nodesIds[i]);
      if (!isValid) {
        toast({
          title: "Can't save flow",
          variant: "destructive",
        });
        return null;
      }
    }

    const flowJson = toObject();
    const flow = JSON.stringify(flowJson);

    localStorage.setItem("flow", flow);
    toast({
      title: "Flow saved",
    });
  }, [getNodes, getEdges, toast, toObject]);

  const onRestoreClick = useCallback(() => {
    const flowString = localStorage.getItem("flow");
    if (!flowString) return;

    const flow = JSON.parse(flowString) as ReactFlowJsonObject<any, any>;
    if (!flow) return;

    setNodes(flow.nodes || []);
    setEdges(flow.edges || []);
  }, [setNodes, setEdges]);

  return (
    <header className="col-span-full">
      <div className="flex items-center justify-end py-2  border h-16">
        <div className="flex gap-2 mx-4">
          <Button
            onClick={onSaveClick}
            className="bg-blue-600 hover:bg-blue-500"
          >
            Save changes
          </Button>
          <Button
            className="text-blue-600 border border-blue-600"
            onClick={onRestoreClick}
            variant="outline"
          >
            Restore
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
