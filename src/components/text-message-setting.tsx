import { Node } from "reactflow";

type Props = {
  node: Node;
};

const TextMessageSetting = ({ node }: Props) => {
  console.log("TextMessageSetting node", node);

  return <div>TextMessageSetting</div>;
};

export default TextMessageSetting;
