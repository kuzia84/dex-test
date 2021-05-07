import React, { useEffect } from "react";
import Select from "react-select";
import { useAppDispatch } from "../../core/redux/hooks";
import {
  IPageSize,
  IPageSizeSelect,
  ISelectTheme,
} from "../../api/dto/components.g";
import s from "./style.module.css";

export const PageSizeSelect: React.FC<IPageSizeSelect> = ({ setPageSize }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setPageSize(6));
  }, [setPageSize, dispatch]);

  const pageSizeOptions: IPageSize[] = [
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

  return (
    <Select
      className={s.reactSelectContainer}
      // classNamePrefix="select-page-size"
      theme={customTheme}
      styles={customStyles}
      options={pageSizeOptions}
      defaultValue={pageSizeOptions[0]}
      onChange={({ value }: any) => {
        dispatch(setPageSize(value));
      }}
    />
  );
};
