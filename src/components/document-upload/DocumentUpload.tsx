import React, { useState } from "react";
import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "./DocumentUpload.scss";
import { useStore } from "../../store";

type FileData = {
  name: string;
  content: string | ArrayBuffer | null;
};

interface DocumentUploadProps {
  requestNumber: string;
}

export default function DocumentUpload({ requestNumber }: DocumentUploadProps) {
  const requests = useStore((s) => s.requests);

  const currentRequest = requests.find((req) => req.number === requestNumber);

  const handleBeforeUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const fileData: FileData = {
        name: file.name,
        content: e.target?.result ?? null,
      };

      useStore.getState().addFileToRequest(fileData, requestNumber);
    };
    reader.readAsDataURL(file);
    return false;
  };

  return (
    <div className="DocumentUpload">
      <h3>Добавить фотографии транспортной документации</h3>
      <Upload
        multiple
        beforeUpload={handleBeforeUpload}
        fileList={[]}
        className="DocumentUpload__btn"
      >
        <Button icon={<UploadOutlined />} style={{ color: "black" }}>
          Загрузить файл
        </Button>
      </Upload>

      <div className="DocumentUpload__files">
        {currentRequest?.files &&
          currentRequest?.files.map((f, i) => (
            <div key={i}>
              <strong>{f.name}</strong>
              {typeof f.content === "string" &&
                f.content.startsWith("data:image") && (
                  <img
                    src={f.content}
                    alt={f.name}
                    style={{ maxWidth: 200, display: "block", marginTop: 5 }}
                  />
                )}
            </div>
          ))}
      </div>
    </div>
  );
}
