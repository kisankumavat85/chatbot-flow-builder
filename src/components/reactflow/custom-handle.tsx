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

const CustomHandle = (props: Props) => {
  const { nodeInternals, edges } = useStore(selector);
  const nodeId = useNodeId();

  const isHandleConnectable = useMemo(() => {
    if (!nodeId) return;

    const node = nodeInternals.get(nodeId);
    if (!node) return;

    const connectedEdges = getConnectedEdges([node], edges);

    if (typeof props.connectable === "function") {
      return props.connectable({ node, connectedEdges });
    }

    if (typeof props.connectable === "number") {
      return connectedEdges.length < props.connectable;
    }

    return props.connectable;
  }, [nodeInternals, edges, nodeId, props]);

  return (
    <Handle {...props} isConnectable={isHandleConnectable}>
      {props.type === "source" ? "s" : "t"}
    </Handle>
  );
};

export default memo(CustomHandle);
