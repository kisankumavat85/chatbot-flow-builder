import { Node } from "reactflow";
import TextMessageSetting from "./text-message-setting";

type Props = {
  node: Node;
};

const settingsType = {
  textMessage: TextMessageSetting,
};

const SettingsPanel = ({ node }: Props) => {
  console.log("node ---", node);
  if (!node.type) return null;

  // TODO: Remove "as textMessage" n give proper types
  const Component = settingsType[node.type as "textMessage"];

  return <div>{<Component node={node} />}</div>;
};

export default SettingsPanel;
