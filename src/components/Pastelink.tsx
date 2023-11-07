import { useState } from "react";
import { linkIcon } from "../assets/icon";
import InputFeild from "./input";
import { input } from "../globalStyle";
import styles from "../pages/dashboard/dashboard.module.scss";

const Pastelink = () => {
  const [link, setLink] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
  };

  return (
    <form>
      <div className={styles.relativeSVG}>
        <span className={styles.absoluteSVG}>{linkIcon}</span>
        <InputFeild
          type="text"
          placeholder="Paste link here..."
          name="paste_link"
          value={link}
          style={input}
          addValue={handleChange}
          id=""
        />
      </div>
    </form>
  );
};

export default Pastelink;
