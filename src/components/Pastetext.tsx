import React, { useState } from 'react';
import InputFeild from './input';
import { input } from '../globalStyle';
import styles from '../pages/dashboard/dashboard.module.scss';

const Pastetext = () => {
  const [text, setText] = useState('');
  const handleChange = (e: any) => {
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
          onChange={handleChange}
          style={input}
        />
      </div>
    </form>
  );
};

export default Pastetext;
