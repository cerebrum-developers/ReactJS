import React, { useState } from 'react';
import styles from '../pages/dashboard/dashboard.module.scss';

const Dashboarddropdown = ({ setView }: any) => {
  const data = [
    {
      id: 1,
      name: 'Upload Document',
    },
    {
      id: 2,
      name: 'Paste Link',
    },
    {
      id: 3,
      name: 'Paste Text',
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
          <div>
            <button
              type="button"
              className={activeButton === x.id ? styles.upload : ''}
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
