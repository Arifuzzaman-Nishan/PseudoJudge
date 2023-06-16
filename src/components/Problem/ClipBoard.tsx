import { FC } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FiCopy } from "react-icons/fi";

const ClipBoard: FC<{ text: string }> = ({ text }) => {
  return (
    <CopyToClipboard text={text}>
      <button className="absolute top-2 right-2 p-1 bg-blue-500 text-white rounded hover:bg-blue-600">
        <FiCopy className="inline-block align-text-bottom" />
      </button>
    </CopyToClipboard>
  );
};

export default ClipBoard;
