import React from "react";
import { IEmpty } from "../../api/dto/components.g";

import s from "./style.module.css";

export const EmptyBase: React.FC<IEmpty> = ({ imageUrl }) => {
  return (
    <div className={s.emptyWrapper}>
      <div className={s.empty}>
        <img src={imageUrl} alt="Empty here" />
        <h3>Empty here</h3>
        <p>Add new teams to continue</p>
      </div>
    </div>
  );
};
