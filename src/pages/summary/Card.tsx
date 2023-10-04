import React, { useEffect, useRef, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import {
  closegrayIcon,
  deletee,
  dislike,
  down,
  like,
  playIcon,
  renameIcon,
} from '../../assets/icon';
import ButtonShow from '../../components/Button';
import styles from './summary.module.scss';

export default function AiNote() {
  return (
    <div>
      <span>AI Notes</span>

      <div>
        <div>
          Next.js Compiler is written in Rust using SWC. It allows Next.js to
          transform and minify your JavaScript code for production. This
          replaces Babel for individual files and Terser for minifying output
          bundles. It is 17x
        </div>

        <ButtonShow />
      </div>
    </div>
  );
}

export const Loreum = () => (
  <>
    <div className={styles.cardShadow}>
      <div className={styles.cardWords}>
        <div>
          <span>{closegrayIcon}</span>
        </div>
        <input type="text" value="72% Reduced - 232 words" />
      </div>
      <div className={styles.aiNote}>
        <span>AI Notes</span>
        <div>
          <span>{like}</span>
          <span>{dislike}</span>
        </div>
      </div>
      <div className={styles.ai_huggingscroll_box}>
        <ul>
          <li>
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              finibus dui id neque mattis, id tristique turpis suscipit. Etiam
              ac dictum enim, ac congue diam. Fusce mi neque, rutrum
              sollicitudin viverra ac, posuere eget tortor.
            </div>
          </li>
          <li>
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              finibus dui id neque mattis, id tristique turpis suscipit. Etiam
              ac dictum enim, ac congue diam. Fusce mi neque, rutrum
              sollicitudin viverra ac, posuere eget tortor.
            </div>
          </li>
          <li>
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              finibus dui id neque mattis, id tristique turpis suscipit. Etiam
              ac dictum enim, ac congue diam. Fusce mi neque, rutrum
              sollicitudin viverra ac, posuere eget tortor.
            </div>
          </li>
          <li>
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              finibus dui id neque mattis, id tristique turpis suscipit. Etiam
              ac dictum enim, ac congue diam. Fusce mi neque, rutrum
              sollicitudin viverra ac, posuere eget tortor.
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div className={styles.dashboardBorderHugging} />
  </>
);

export const Libraries = ({ dataObj }: any) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleOutsideClick = () => {
      if (dropdownRef.current) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div className={styles.libraries_hugging_all}>
      <div className={styles.documentName}>{dataObj.name}</div>
      <div>
        <div className={styles.date}>{dataObj.date}</div>
      </div>
      <div ref={dropdownRef}>
        <button type="button" onClick={toggleDropdown}>
          <BsThreeDotsVertical />
        </button>
        {isDropdownOpen && (
          <ul>
            <li key="play">
              <a href="/">
                <span>{playIcon}</span>
                Play
              </a>
            </li>
            <li key="rename">
              <a href="/">
                <span>{renameIcon}</span>
                Rename
              </a>
            </li>
            <li key="download">
              <a href="/">
                <span>{down}</span>
                Download
              </a>
            </li>
            <li key="delete">
              <a href="/">
                <span>{deletee}</span>
                Delete
              </a>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};
