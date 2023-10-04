import React, { useState } from 'react';
import Dashboarddropdown from '../../components/Dashboarddropdown';
import FileUpload from './FileUpload';
import Pastelink from '../../components/Pastelink';
import Pastetext from '../../components/Pastetext';
import styles from './dashboard.module.scss';

const DashboardUpload = () => {
  const [viewType, setViewType] = useState(1);
  return (
    <div className={styles.dashboard}>
      <Dashboarddropdown setView={setViewType} viewType={viewType} />

      {(() => {
        if (viewType === 1) return <FileUpload />;
        if (viewType === 2) return <Pastelink />;
        return <Pastetext />;
      })()}
    </div>
  );
};

export default DashboardUpload;
