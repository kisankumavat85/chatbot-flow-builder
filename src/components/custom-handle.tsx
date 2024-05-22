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

  const isHandleConnectable = useMemo(() => {
    if (!nodeId) return;

    const node = nodeInternals.get(nodeId);
    if (!node) return;

    const connectedEdges = getConnectedEdges([node], edges);

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
