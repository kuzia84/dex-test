import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState, AppDispach } from "./store";

export const useAppDispatch = () => useDispatch<AppDispach>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
