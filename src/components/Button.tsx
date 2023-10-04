import React, { memo } from 'react';

const ButtonShow = memo(({
  name, action, styleClass, style, type,
}: any) => (
  <button
    type={type ? 'submit' : 'button'}
    onClick={action}
    style={style}
    className={styleClass}
  >
    {name}
  </button>
));

export default ButtonShow;
