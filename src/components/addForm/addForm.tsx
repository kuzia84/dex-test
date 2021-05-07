import React from "react";
import { IAddFormProps } from "../../api/dto/components.g";
import s from "./style.module.css";

export const AddForm: React.FC<IAddFormProps> = (props) => {
  return (
    <form className={s.formAdd} onSubmit={props.onSubmit}>
      {props.children}
    </form>
  );
};
