import { memo, useMemo } from "react";
import {
  Edge,
  getConnectedEdges,
  Handle,
  Node,
  ReactFlowState,
  useNodeId,
  useStore,
  HandleProps,
} from "reactflow";

const selector = (s: ReactFlowState) => ({
  nodeInternals: s.nodeInternals,
  edges: s.edges,
});

type IsConnectableArgs = {
  node: Node<any, string | undefined>;
  connectedEdges: Edge[];
};

interface Props extends HandleProps {
  connectable?: ((args: IsConnectableArgs) => boolean) | number;
}

const CustomHandle = ({ connectable, ...rest }: Props) => {
  const { nodeInternals, edges } = useStore(selector);
  const nodeId = useNodeId();

  // With this function we can check weather the handle is connectable or not with he help of custom function connectable
  const isHandleConnectable = useMemo(() => {
    if (!nodeId) return;

    const node = nodeInternals.get(nodeId);
    if (!node) return;

    const connectedEdges = getConnectedEdges([node], edges);

    // If the connectable is a fun. we pass node and connect edges so that when we use this compo. we can dynamically return boolean value as per logic
    if (typeof connectable === "function") {
      return connectable({ node, connectedEdges });
    }

    if (typeof connectable === "number") {
      return connectedEdges.length < connectable;
    }

    return connectable;
  }, [nodeInternals, edges, nodeId, connectable]);

  return <Handle {...rest} isConnectable={isHandleConnectable} />;
};

export default memo(CustomHandle);
