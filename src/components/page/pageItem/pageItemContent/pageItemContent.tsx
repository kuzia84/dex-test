import React from "react";
import s from "./style.module.css";
import cn from "classnames";
import { IPageItemContentProps } from "../../../../api/dto/components.g";

export const PageItemContent: React.FC<IPageItemContentProps> = (props) => {
  return (
    <div className={cn(s.itemContent, { [s.bg]: props.bg })}>
      {props.children}
    </div>
  );
};
