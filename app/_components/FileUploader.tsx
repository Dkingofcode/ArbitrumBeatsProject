import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

interface FileUploaderProps {
  fileType: "audio" | "vst";
}

const FileUploader: React.FC<FileUploaderProps> = ({ fileType }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const formData = new FormData();
    acceptedFiles.forEach((file) => {
      formData.append("file", file);
    });

    axios
      .post("/api/Upload", formData)
      .then(() => alert(`${fileType} uploaded successfully!`))
      .catch((err) => console.error(err));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      style={{
        border: "2px dashed gray",
        padding: "20px",
        textAlign: "center",
        cursor: "pointer",
      }}
    >
      <input {...getInputProps()} />
      <p>Drag and drop your {fileType} files here, or click to select them</p>
    </div>
  );
};

export default FileUploader;
