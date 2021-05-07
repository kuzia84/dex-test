import React from "react";
import s from "./style.module.css";

export const AddFormImage: React.FC = (props) => {
  return <div className={s.formImage}>{props.children}</div>;
};
