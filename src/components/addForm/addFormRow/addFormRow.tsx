import React from "react";
import s from "./style.module.css";

export const AddFormRow: React.FC = (props) => {
  return <div className={s.formRow}>{props.children}</div>;
};
