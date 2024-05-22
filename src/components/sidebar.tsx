import { memo, useState } from "react";
import { Node, useOnSelectionChange } from "reactflow";

import SettingsPanel from "./settings-panel";
import NodesPanel from "./nodes-panel";

const Sidebar = () => {
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  // We use this hook to keep eye on selected nodes, Here we get all the selected nodes so we will just take first node and set it as selectedNode
  useOnSelectionChange({
    onChange: ({ nodes }) => {
      if (nodes.length === 1) setSelectedNode(nodes[0]);
      if (nodes.length === 0) setSelectedNode(null);
    },
  });

  return (
    <aside className="border-l">
      {/* With the help of selected node we render Settings panel and Nodes panel */}
      {selectedNode ? <SettingsPanel node={selectedNode} /> : <NodesPanel />}
    </aside>
  );
};

export default memo(Sidebar);
