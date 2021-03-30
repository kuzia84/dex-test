import { InputProps } from "../../Interfaces";

import s from "./style.module.css";

const InputGroup: React.FC<InputProps> = ({
  label,
  type = "text",
  inputName,
  errorText,
  register,
  required,
  errors,
}) => {
  return (
    <div className={s.inputGroup}>
      {type === "file" ? (
        <label className={s.fileLabel} htmlFor={inputName}></label>
      ) : (
        <label className={s.label} htmlFor={inputName}>
          {label}
        </label>
      )}
      <input
        className={s.input}
        type={type}
        name={inputName}
        id={inputName}
        ref={register({ required })}
      />
      {errors[inputName] && <div className={s.error}>{errorText}</div>}
    </div>
  );
};

export default InputGroup;
