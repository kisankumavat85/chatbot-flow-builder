import { memo, useState } from "react";
import { Node, useOnSelectionChange } from "reactflow";

import SettingsPanel from "../settings-panel";
import NodesPanel from "../nodes-panel";

const Sidebar = () => {
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  useOnSelectionChange({
    onChange: ({ nodes }) => {
      if (nodes.length === 1) setSelectedNode(nodes[0]);
      if (nodes.length === 0) setSelectedNode(null);
    },
  });

  return (
    <aside className="border-l p-4">
      {selectedNode ? <SettingsPanel node={selectedNode} /> : <NodesPanel />}
    </aside>
  );
};

export default memo(Sidebar);
