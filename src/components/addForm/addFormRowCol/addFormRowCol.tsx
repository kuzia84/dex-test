import React from "react";
import s from "./style.module.css";

export const AddFormRowCol: React.FC = (props) => {
  return <div className={s.formRowCol}>{props.children}</div>;
};
