import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { Dispatch, FunctionComponent, SetStateAction } from "react";
import { Control, FieldErrors } from "react-hook-form";
import { playersRequestType } from "./player.g";

export interface IAppState {
  sidebarShow: boolean;
}

export interface IMenu {
  id: number;
  name: string;
  img: FunctionComponent;
  to: string;
}

export interface IPageSize {
  value: number;
  label: number;
}

export interface IFetchSuffix {
  searchText: string;
  pageNumber: number;
  pageSize: number;
  teamIds?: string;
}

export interface IEmpty {
  imageUrl: string;
}

export type IPagination = {
  loadedCardsNumber: number; // кол-во загруженных элементов
  pageSize: number; //размер страницы
  pageNumber?: number;
  onPageChange?: (pageNumber: number) => void;
};

export type IPageSizeSelect = {
  selctedPageSize?: number;
  setPageSize: (pageSize: number) => void;
};

export type SelectTeamsPropsType = {
  setTeamIds: (teamsIds: string) => void;
};

export interface ISearch {
  setSearchText: (searchText: string) => void;
}

export type RefReturn =
  | string
  | ((instance: HTMLInputElement | null) => void)
  | React.RefObject<HTMLInputElement>
  | null
  | undefined;

export type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label?: string;
  type?: string;
  inputName: string;
  errorText: string;
  errors: FieldErrors;
  imageUrl?: string;
  register: ({ required }: { required?: boolean }) => RefReturn;
  isRequired?: boolean;
};

export type RefReturnSelect =
  | string
  | ((instance: HTMLSelectElement | null) => void)
  | React.RefObject<HTMLSelectElement>
  | null
  | undefined;

export type SelectProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
> & {
  options: { value: number | string; label: string }[];
  label?: string;
  selectName: string;
  errorText: string;
  errors: FieldErrors;
  register: ({ required }: { required?: boolean }) => RefReturnSelect;
  control: Control;
  defaultValueIndex?: number;
};

export interface IControlButtonsProps {
  delete: () => void;
  update: () => void;
}

export interface IAuthContainerProps {
  img: string;
}

export interface IButtonProps {
  textBtn?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  handleClick?: () => void;
}

export interface IPageItemTopProps {
  bg?: boolean;
}

export interface IPageItemContentProps {
  bg?: boolean;
}

export interface IAddFormProps {
  onSubmit: () => void;
}

export interface ISelectTheme {
  borderRadius: number;
  colors: {};
  spacing: {
    baseUnit: number;
    controlHeight: number;
    menuGutter: number;
  };
}

export interface ISelectStyles {
  ":active:": {
    backgroundColor: string;
  };
  WebkitTapHighlightColor: string;
  backgroundColor: string;
  boxSizing: string;
  color: string;
  cursor: string;
  display: string;
  fontSize: string;
  label: string;
  padding: string;
  userSelect: string;
  width: string;
}
