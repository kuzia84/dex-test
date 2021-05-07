import React from "react";
import s from "./style.module.css";

export const AddFormCol: React.FC = (props) => {
  return <div className={s.formCol}>{props.children}</div>;
};
