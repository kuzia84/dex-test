import { Controller } from "react-hook-form";
import Select from "react-select";
import { SelectProps } from "../../api/dto/components.g";
import s from "./style.module.css";

export const SelectGroup: React.FC<SelectProps> = ({
  label,
  selectName,
  errorText,
  errors,
  control,
  options,
  defaultValueIndex = -1,
}) => {
  const customTheme = (theme: { colors: {} }) => {
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
      {(defaultValueIndex === -1 && (
        <Controller
          theme={customTheme}
          name={selectName}
          control={control}
          options={options}
          as={Select}
        />
      )) || (
        <Controller
          theme={customTheme}
          name={selectName}
          control={control}
          options={options}
          defaultValue={options[defaultValueIndex]}
          as={Select}
        />
      )}

      {errors[selectName] && <div className={s.error}>{errorText}</div>}
    </div>
  );
};
