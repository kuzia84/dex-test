import s from "./style.module.css";

interface CheckboxProps {
  name: string;
  label: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ name, label }) => {
  return (
    <div className={s.customCheckbox}>
      <input
        className={s.customCheckboxInput}
        type="checkbox"
        id={name}
        checked
      />
      <label className={s.customCheckboxLabel} htmlFor={name}>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
