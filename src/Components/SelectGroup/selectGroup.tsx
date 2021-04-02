import { Controller } from "react-hook-form";
import Select from "react-select";
import { SelectProps } from "../../Interfaces/interfaces";
import s from "./style.module.css";

export const SelectGroup: React.FC<SelectProps> = ({
  label,
  selectName,
  errorText,
  errors,
  control,
  options,
}) => {
  const customTheme = (theme: any) => {
    return {
      ...theme,
      colors: {
        ...theme.colors,
        primary25: "#C60E2E",
        primary: "#C60E2E",
      },
    };
  };
  return (
    <div className={s.selectGroup}>
      <label className={s.label} htmlFor={selectName}>
        {label}
      </label>
      <Controller
        theme={customTheme}
        name={selectName}
        control={control}
        options={options}
        defaultValue=""
        as={Select}
      />
      {errors[selectName] && <div className={s.error}>{errorText}</div>}
    </div>
  );
};
