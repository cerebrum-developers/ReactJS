import { memo } from "react";

type AddValue = (e: React.ChangeEvent<HTMLInputElement>) => void | null;

interface userType {
  name: string;
  placeholder: string;
  type: string;
  addValue: AddValue;
  value: string;
  id: string;
  style: object;
}

const UserInput = ({
  name,
  placeholder,
  type,
  addValue,
  value,
  id,
  style,
}: userType) => (
  <input
    placeholder={placeholder}
    type={type}
    name={name}
    onChange={addValue}
    id={id}
    value={value}
    style={style}
    autoComplete="off"
    multiple
  />
);

export default memo(UserInput);
