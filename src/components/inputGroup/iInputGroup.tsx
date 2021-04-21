import React, { useState } from "react";
import { InputProps } from "../../api/dto/components.g";

import s from "./style.module.css";
import cn from "classnames";

export const InputGroup: React.FC<InputProps> = ({
  label,
  type = "text",
  inputName,
  errorText,
  register,
  required,
  isRequired = true,
  errors,
  imageUrl,
}) => {
  const [showPwd, setShowPwd] = useState<boolean>(false);
  const [inputType, setInputType] = useState<string>(type);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setShowPwd((prevState) => !prevState);
    if (inputType === "password") {
      setInputType("text");
    }
    if (inputType === "text") {
      setInputType("password");
    }
  };

  const reg = isRequired ? register({ required }) : register({});

  return (
    <div className={cn(s.inputGroup, { [s.showPwd]: showPwd })}>
      {type === "file" ? (
        <>
          <label
            className={s.fileLabel}
            htmlFor={inputName}
            style={{
              backgroundImage: `url(${imageUrl})`,
            }}
          ></label>
          <input
            className={s.input}
            type={inputType}
            name={inputName}
            id={inputName}
            accept="image/*"
            ref={reg}
          />
        </>
      ) : (
        <>
          <label className={s.label} htmlFor={inputName}>
            {label}
          </label>
          <input
            className={s.input}
            type={inputType}
            name={inputName}
            id={inputName}
            ref={register({ required })}
          />
        </>
      )}
      {inputName === "checkPassword" ? (
        <span className={s.showPassword} onClick={handleClick}></span>
      ) : inputName === "password" ? (
        <span className={s.showPassword} onClick={handleClick}></span>
      ) : (
        ""
      )}
      {errors[inputName] && <div className={s.error}>{errorText}</div>}
    </div>
  );
};
