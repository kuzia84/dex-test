import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITeamState } from "../../api/dto/team.g";
import {
  fetchAddTeam,
  fetchDeleteTeamById,
  fetchSingleTeamAsync,
  fetchTeamsAsync,
  fetchUpdateTeamById,
} from "./teamThunk";

const initialState: ITeamState = {
  addIsLoading: true,
  addFetchResult: {},
  addErrors: null,
  getOneTeamIsLoading: true,
  getOneTeamFetchResult: {
    name: "",
    foundationYear: 0,
    division: "",
    conference: "",
    imageUrl: "",
    id: 0,
  },
  getOneTeamError: null,
  getTeamsIsLoading: true,
  getTeamsFetchResult: {
    data: [],
    count: 0,
    page: 1,
    size: 6,
  },
  getTeamsError: null,
  updateIsLoading: true,
  updateFetchResult: {},
  updateErrors: null,
  deleteIsLoading: true,
  deleteFetchResult: {
    name: "",
    foundationYear: 0,
    division: "",
    conference: "",
    imageUrl: "",
    id: 0,
  },
  deleteErrors: null,
  teamsFetchSuffix: {
    searchText: "",
    pageNumber: 1,
    pageSize: 6,
  },
};

const teamSlise = createSlice({
  name: "team",
  initialState,
  reducers: {
    teamReset: (state) => initialState,
    oneTeamReset: (state) => {
      state.getOneTeamFetchResult = {
        name: "",
        foundationYear: 0,
        division: "",
        conference: "",
        imageUrl: "",
        id: 0,
      };
    },
    setSearchText: (state, action: PayloadAction<string>) => {
      state.teamsFetchSuffix.pageNumber = 1;
      state.teamsFetchSuffix.searchText = action.payload;
    },
    setPageNumber: (state, action: PayloadAction<number>) => {
      state.teamsFetchSuffix.pageNumber = action.payload;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.teamsFetchSuffix.pageNumber = 1;
      state.teamsFetchSuffix.pageSize = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAddTeam.pending, (state) => {
      state.addIsLoading = true;
    });
    builder.addCase(fetchAddTeam.fulfilled, (state, action) => {
      state.addIsLoading = false;
      state.addFetchResult = action.payload;
    });
    builder.addCase(fetchAddTeam.rejected, (state, action) => {
      state.addIsLoading = false;
      state.addErrors = action.error;
    });
    builder.addCase(fetchSingleTeamAsync.pending, (state) => {
      state.getOneTeamIsLoading = true;
    });
    builder.addCase(fetchSingleTeamAsync.fulfilled, (state, action) => {
      state.getOneTeamIsLoading = false;
      state.getOneTeamFetchResult = action.payload;
    });
    builder.addCase(fetchSingleTeamAsync.rejected, (state, action) => {
      state.getOneTeamIsLoading = false;
      state.getOneTeamError = action.error;
    });
    builder.addCase(fetchTeamsAsync.pending, (state) => {
      state.getTeamsIsLoading = true;
    });
    builder.addCase(fetchTeamsAsync.fulfilled, (state, action) => {
      state.getTeamsIsLoading = false;
      state.getTeamsFetchResult = action.payload;
    });
    builder.addCase(fetchTeamsAsync.rejected, (state, action) => {
      state.getTeamsIsLoading = false;
      state.getTeamsError = action.error;
    });
    builder.addCase(fetchUpdateTeamById.pending, (state) => {
      state.updateIsLoading = true;
    });
    builder.addCase(fetchUpdateTeamById.fulfilled, (state, action) => {
      state.updateIsLoading = false;
      state.updateFetchResult = action.payload;
    });
    builder.addCase(fetchUpdateTeamById.rejected, (state, action) => {
      state.updateIsLoading = false;
      state.updateErrors = action.error;
    });
    builder.addCase(fetchDeleteTeamById.pending, (state) => {
      state.deleteIsLoading = true;
    });
    builder.addCase(fetchDeleteTeamById.fulfilled, (state, action) => {
      state.deleteIsLoading = false;
      state.deleteFetchResult = action.payload;
    });
    builder.addCase(fetchDeleteTeamById.rejected, (state, action) => {
      state.deleteIsLoading = false;
      state.deleteErrors = action.error;
    });
  },
});

export const {
  setSearchText,
  setPageNumber,
  setPageSize,
  oneTeamReset,
  teamReset,
} = teamSlise.actions;

export const teamReducer = teamSlise.reducer;
