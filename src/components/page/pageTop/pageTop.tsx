import React from "react";
import s from "./style.module.css";

export const PageTop: React.FC = (props) => {
  return <div className={s.pageTop}>{props.children}</div>;
};
