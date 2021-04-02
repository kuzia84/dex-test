import { InputProps } from "../../Interfaces/interfaces";
import s from "./style.module.css";

export const Checkbox: React.FC<InputProps> = ({
  label,
  type = "checkbox",
  inputName,
  errorText,
  register,
  required,
  errors,
}) => {
  return (
    <div className={s.customCheckbox}>
      <input
        className={s.customCheckboxInput}
        type={type}
        name={inputName}
        id={inputName}
        ref={register({ required })}
      />
      <label className={s.customCheckboxLabel} htmlFor={inputName}>
        {label}
      </label>
      {errors[inputName] && <div className={s.error}>{errorText}</div>}
    </div>
  );
};
