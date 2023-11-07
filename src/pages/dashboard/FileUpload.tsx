import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { Libraries } from "../summary/Card";
import { uploadDocument } from "../../assets/icon";
import styles from "./dashboard.module.scss";

const FileUpload = () => {
  const [upload, setUpload] = useState<string>("");

  const handleFileUpload = (file: any) => {
    if (file.name) setUpload(file.name);
  };

  const dataArr = {
    name: "Document One",
    date: "04-05-2023",
    id: 1,
  };

  return (
    <div>
      <div className={styles.uploadFile}>
        <FileUploader
          multiple={false}
          handleChange={handleFileUpload}
          name="file"
          types={["DOCX", "PDF", "PPTX", "CSV", "XLSX", "XLS"]}
        >
          <div
            className={styles.dashboardShadow}
            data-placement="bottom"
            title="types:  DOCX, PDF, PPTX, CSV, XLSX, XLS"
          >
            <div className={styles.uploadDocumentIcon}>{uploadDocument}</div>
            <div className={styles.uploadDocumentText}>Upload Document</div>
            <div className={styles.upload}>{`File name: ${upload}`}</div>
          </div>
        </FileUploader>
      </div>
      <div className={styles.libCompo}>
        <div className={styles.recent}>Recent Documents</div>
        <Libraries dataObj={dataArr} />
      </div>
    </div>
  );
};

export default FileUpload;
