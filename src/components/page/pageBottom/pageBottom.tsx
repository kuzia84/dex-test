import React from "react";
import s from "./style.module.css";

export const PageBottom: React.FC = (props) => {
  return <div className={s.pageBottom}>{props.children}</div>;
};
