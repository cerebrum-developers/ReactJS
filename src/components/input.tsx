import React, { memo } from 'react';

const UserInput = ({
  name,
  placeholder,
  type,
  refs,
  addValue,
  showValue,
  defaultValue,
  id,
  style,
}: any) => (
  <input
    placeholder={placeholder}
    type={type}
    name={name}
    onChange={addValue}
    ref={refs}
    defaultValue={defaultValue}
    id={id}
    value={showValue}
    style={style}
    autoComplete="off"
    multiple
  />
);

export default memo(UserInput);
