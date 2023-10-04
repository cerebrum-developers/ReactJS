import React, { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { Libraries } from '../summary/Card';
import { uploadDocument } from '../../assets/icon';
import styles from './dashboard.module.scss';

const FileUpload = () => {
  const [, setUpload] = useState(null);

  const handleFileUpload = (file: any) => {
    setUpload(file);
  };
  const handleButton = () => {
    const result = document.getElementsByTagName('p');
    for (let i = 0; i < result.length; i += 1) {
      console.log(result[i].innerHTML, 'getdata');
    }
  };

  const dataArr = {
    name: 'Document One',
    date: '04-05-2023',
  };

  return (
    <div>
      <div className={styles.uploadFile}>
        <FileUploader
          multiple={false}
          handleChange={handleFileUpload}
          name="file"
          types={[
            'JPEG',
            'JPG',
            'PNG',
            'DOCX',
            'GIF',
            'PDF',
            'PPTX',
            'CSV',
            'XLSX',
            'XLS',
          ]}
        >
          <div
            className={styles.dashboardShadow}
            data-placement="bottom"
            title="types: JPEG, JPG, PNG, DOCX, GIF, PDF, PPTX, CSV, XLSX, XLS"
          >
            <div className={styles.uploadDocumentIcon}>{uploadDocument}</div>
            <div className={styles.uploadDocumentText}>Upload Document</div>
          </div>
        </FileUploader>
      </div>
      <div className={styles.signupBtnHugging}>
        <button type="button" onClick={handleButton}>Run Summary</button>
      </div>
      <div className={styles.libCompo}>
        <div className={styles.recent}>Recent Documents</div>
        <Libraries dataObj={dataArr} />
      </div>
    </div>
  );
};

export default FileUpload;
