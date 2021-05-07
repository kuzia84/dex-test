import React from "react";
import s from "./style.module.css";
import cn from "classnames";
import { IPageItemTopProps } from "../../../../api/dto/components.g";

export const PageItemTop: React.FC<IPageItemTopProps> = (props) => {
  return (
    <div className={cn(s.itemTop, { [s.bg]: props.bg })}>{props.children}</div>
  );
};
