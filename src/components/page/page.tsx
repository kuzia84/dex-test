import React from "react";
import { Header } from "../header/header";
import { Sidebar } from "../sidebar/sidebar";
import s from "./style.module.css";

export const Page: React.FC = (props) => {
  return (
    <div className={s.page}>
      <Header />
      <Sidebar />
      <div className={s.pageContent}>{props.children}</div>
    </div>
  );
};
