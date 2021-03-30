import { ChangeEvent } from "react";
import s from "./style.module.css";

interface InputProps {
  name: string;
  type?: string;
  value: string;
  label: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
//
const Input: React.FC<InputProps> = ({
  name,
  type = "text",
  value,
  label,
  onChange,
}) => {
  return (
    <div className={s.inputGroup}>
      <label htmlFor={name}>{label}</label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        // required
      />
    </div>
  );
};

export default Input;
