import { useState } from "react";
import styles from "../pages/dashboard/dashboard.module.scss";

interface PropsDashboard {
  setView: React.Dispatch<React.SetStateAction<number>>;
}
const Dashboarddropdown = ({ setView }: PropsDashboard) => {
  const data = [
    {
      id: 1,
      name: "Summary",
    },
    {
      id: 2,
      name: "Upload Document",
    },
    {
      id: 3,
      name: "Paste Link",
    },
    {
      id: 4,
      name: "Paste Text",
    },
  ];

  const [activeButton, setActiveButton] = useState(1);

  const handleButtonClick = (id: number) => {
    setView(id);
    setActiveButton(id);
  };

  return (
    <div>
      <div className={styles.welcomeH}>Welcome to Huggingface</div>
      <div className={styles.uploadBtn}>
        {data.map((x) => (
          <div key={x.id}>
            <button
              type="button"
              className={activeButton === x.id ? styles.upload : ""}
              onClick={() => handleButtonClick(x.id)}
            >
              {x.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboarddropdown;
