import React from "react";
import Select from "react-select";
import {
  IPageSize,
  IPageSizeSelect,
  ISelectTheme,
} from "../../api/dto/components.g";
import s from "./style.module.css";

export const PageSizeSelect: React.FC<IPageSizeSelect> = ({
  setPageSize,
  selctedPageSize,
}) => {
  const pageSizeOptions: Array<IPageSize> = [
    { value: 6, label: 6 },
    { value: 12, label: 12 },
    { value: 24, label: 24 },
  ];

  const customTheme = (theme: ISelectTheme) => {
    return {
      ...theme,
      colors: {
        ...theme.colors,
        primary25: "#FF768E",
        primary: "#C60E2E",
      },
    };
  };

  const customStyles = {
    control: (styles: {}) => {
      return {
        ...styles,
        minHeight: "40px",
      };
    },
    menu: (styles: {}) => {
      return {
        ...styles,
        top: "auto",
        bottom: "100%",
      };
    },
  };

  const handleClick = (data: number) => {
    setPageSize && setPageSize(data);
  };

  const i =
    selctedPageSize === 6
      ? 0
      : selctedPageSize === 12
      ? 1
      : selctedPageSize === 24
      ? 2
      : 0;

  return (
    <Select
      className={s.reactSelectContainer}
      // classNamePrefix="select-page-size"
      theme={customTheme}
      styles={customStyles}
      options={pageSizeOptions}
      defaultValue={pageSizeOptions[i]}
      onChange={(data) => {
        data && handleClick(data.value);
      }}
    />
  );
};
