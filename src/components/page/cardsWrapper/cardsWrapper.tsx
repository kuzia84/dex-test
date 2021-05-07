import React from "react";
import s from "./style.module.css";

export const CardsWrapper: React.FC = (props) => {
  return <div className={s.cardsWrapper}>{props.children}</div>;
};
