import { RootState } from "../../core/redux/store";

export const selectSidebrSate = (state: RootState) => state.app.sidebarShow;
