import React from "react";
import { IButtonProps } from "../../api/dto/components.g";
import s from "./style.module.css";
import cn from "classnames";

export const Button: React.FC<IButtonProps> = (props) => {
  return (
    <button
      className={cn(s.btn, { [s.btnText]: props.textBtn })}
      onClick={props.handleClick}
      type={props.type}
    >
      {props.children}
    </button>
  );
};
