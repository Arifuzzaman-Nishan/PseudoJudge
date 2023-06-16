import React, { useRef, useState } from "react";
import { FiUpload } from "react-icons/fi";

const CodeEditorHeader = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
      event.target.value = "";
    }
  };

  return (
    <div className="w-full bg-grey-lighter">
      <label className="flex flex-col items-center p-2 bg-white text-blue-500 tracking-wide border cursor-pointer transition-colors duration-300 ease-in-out">
        <FiUpload className="w-6 h-6" />
        <span className="mt-1 text-sm leading-tight">
          {file ? file.name : "Upload Code"}
        </span>
        <input type="file" className="hidden" onChange={handleFileChange} />
      </label>
    </div>
  );
};

export default CodeEditorHeader;
