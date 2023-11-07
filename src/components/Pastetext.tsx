import { useState } from "react";
import InputFeild from "./input";
import { input } from "../globalStyle";
import styles from "../pages/dashboard/dashboard.module.scss";

const Pastetext = () => {
  const [text, setText] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  return (
    <form>
      <div className={styles.relativeSVG}>
        <InputFeild
          type="text"
          placeholder="Paste Text..."
          name="paste_text"
          value={text}
          addValue={handleChange}
          style={input}
          id=""
        />
      </div>
    </form>
  );
};

export default Pastetext;
