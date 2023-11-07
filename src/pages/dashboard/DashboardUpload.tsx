import { useState } from "react";
import Dashboarddropdown from "../../components/Dashboarddropdown";
import FileUpload from "./FileUpload";
import Pastelink from "../../components/Pastelink";
import Pastetext from "../../components/Pastetext";
import styles from "./dashboard.module.scss";
import Landing2 from "../../components/Landing2";

const DashboardUpload = () => {
  const [viewType, setViewType] = useState(1);
  // React.Dispatch<React.SetStateAction<number>>
  return (
    <div className={styles.dashboard}>
      <Dashboarddropdown setView={setViewType} />

      {(() => {
        if (viewType === 1) return <Landing2 />;
        if (viewType === 2) return <FileUpload />;
        if (viewType === 3) return <Pastelink />;
        return <Pastetext />;
      })()}
    </div>
  );
};

export default DashboardUpload;
