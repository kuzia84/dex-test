import React from "react";
import s from "./style.module.css";

export const AddFormInfo: React.FC = (props) => {
  return <div className={s.formInfo}>{props.children}</div>;
};
