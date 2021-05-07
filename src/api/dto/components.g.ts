import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

export interface IAppState {
  sidebarShow: boolean;
  deleteIsLoading: boolean;
  deleteFetchResult: {
    name: string;
  };
  deleteErrors: any;
}

export interface IMenu {
  id: number;
  name: string;
  img: any;
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

export interface IPagination {
  page: string;
  loadedCardsNumber: number;
  pageSize: number;
  pageNumber: number;
  setPageNumber: ActionCreatorWithPayload<number, string>;
}

export interface IPageSizeSelect {
  setPageSize: ActionCreatorWithPayload<number, string>;
}

export interface ISearch {
  setSearchText: ActionCreatorWithPayload<string, string>;
}

export interface IInputGroupProps {
  label: string;
  type?: string;
  inputName: string;
  errorText: string;
  register: any;
  required?: boolean;
  errors?: any;
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
  errors: any;
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
  errors: any;
  register: ({ required }: { required?: boolean }) => RefReturnSelect;
  control: any;
  defaultValueIndex?: number;
};

export interface IControlButtonsProps {
  itemId: number;
  page: string;
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
