import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { rootReducer } from "./rootReducer";

export const store = configureStore(rootReducer);

export type AppDispach = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispach>();
export type RootState = ReturnType<typeof store.getState>;
