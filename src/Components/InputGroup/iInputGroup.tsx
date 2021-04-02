import { useState } from "react";
import { InputProps } from "../../Interfaces/interfaces";

import s from "./style.module.css";
import cn from "classnames";

export const InputGroup: React.FC<InputProps> = ({
  label,
  type = "text",
  inputName,
  errorText,
  register,
  required,
  errors,
}) => {
  const [showPwd, setShowPwd] = useState<boolean>(false);
  const [inputType, setInputType] = useState<string>(type);
  const handleClick = (event: any) => {
    event.preventDefault();
    setShowPwd((prevState) => !prevState);
    if (inputType === "password") {
      setInputType("text");
    }
    if (inputType === "text") {
      setInputType("password");
    }
  };
  return (
    <div className={cn(s.inputGroup, { [s.showPwd]: showPwd })}>
      {type === "file" ? (
        <label className={s.fileLabel} htmlFor={inputName}></label>
      ) : (
        <label className={s.label} htmlFor={inputName}>
          {label}
        </label>
      )}
      <input
        className={s.input}
        type={inputType}
        name={inputName}
        id={inputName}
        ref={register({ required })}
      />
      {inputName === "checkPassword" ? (
        <button className={s.showPassword} onClick={handleClick}></button>
      ) : inputName === "password" ? (
        <button className={s.showPassword} onClick={handleClick}></button>
      ) : (
        ""
      )}
      {errors[inputName] && <div className={s.error}>{errorText}</div>}
    </div>
  );
};
