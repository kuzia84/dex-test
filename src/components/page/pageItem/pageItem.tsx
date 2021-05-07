import React from "react";
import s from "./style.module.css";

export const PageItem: React.FC = (props) => {
  return (
    <div className={s.item}>
      <div className={s.itemWrapper}>{props.children}</div>
    </div>
  );
};
