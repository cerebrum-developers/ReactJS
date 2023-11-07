import { MouseEventHandler, memo } from "react";

interface buttonType {
  name: string | JSX.Element[];
  action: MouseEventHandler<HTMLButtonElement>;
  styleClass: string;
  style: any;
  type: string;
}
const ButtonShow = ({ name, action, styleClass, style, type }: buttonType) => (
  <button
    type={type ? "submit" : "button"}
    onClick={action}
    style={style}
    className={styleClass}
  >
    {name}
  </button>
);

export default memo(ButtonShow);
