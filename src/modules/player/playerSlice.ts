import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPlayersState } from "../../api/dto/player.g";
import {
  fetchAddPlayer,
  fetchPlayersAsync,
  fetchSinglePlayerAsync,
  fetchUpdatePlayerById,
  fetchPlayerPositionsAsync,
} from "./playerThunk";

const initialState: IPlayersState = {
  addIsLoading: true,
  addFetchResult: {},
  addErrors: null,
  getPositionsIsLoading: true,
  getPositionsFetchResult: [],
  getPositionsError: null,
  getOnePlayerIsLoading: true,
  getOnePlayerFetchResult: {
    name: "",
    number: 0,
    position: "",
    teamId: 0,
    birthday: "",
    height: 0,
    weight: 0,
    avatarUrl: "",
    id: 0,
    teamName: "",
  },
  getOnePlayerError: null,
  getPlayersIsLoading: true,
  getPlayersFetchResult: {
    data: [],
    count: 0,
    page: 1,
    size: 6,
  },
  getPlayersError: null,
  updateIsLoading: true,
  updateFetchResult: {},
  updateErrors: null,
  playersFetchSuffix: {
    searchText: "",
    pageNumber: 1,
    pageSize: 6,
    teamIds: "",
  },
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    playerReset: (state) => initialState,
    onePlayerReset: (state) => {
      state.getOnePlayerFetchResult = {
        name: "",
        number: 0,
        position: "",
        teamId: 0,
        birthday: "",
        height: 0,
        weight: 0,
        avatarUrl: "",
        id: 0,
        teamName: "",
      };
    },
    setSearchText: (state, action: PayloadAction<string>) => {
      state.playersFetchSuffix.pageNumber = 1;
      state.playersFetchSuffix.searchText = action.payload;
    },
    setPageNumber: (state, action: PayloadAction<number>) => {
      state.playersFetchSuffix.pageNumber = action.payload;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.playersFetchSuffix.pageNumber = 1;
      state.playersFetchSuffix.pageSize = action.payload;
    },
    setTeamIds: (state, action: PayloadAction<string>) => {
      state.playersFetchSuffix.pageNumber = 1;
      state.playersFetchSuffix.teamIds = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAddPlayer.pending, (state) => {
      state.addIsLoading = true;
    });
    builder.addCase(fetchAddPlayer.fulfilled, (state, action) => {
      state.addIsLoading = false;
      state.addFetchResult = action.payload;
    });
    builder.addCase(fetchAddPlayer.rejected, (state, action) => {
      state.addIsLoading = false;
      state.addErrors = action.error;
    });
    builder.addCase(fetchPlayerPositionsAsync.pending, (state) => {
      state.getPositionsIsLoading = true;
    });
    builder.addCase(fetchPlayerPositionsAsync.fulfilled, (state, action) => {
      state.getPositionsIsLoading = false;
      state.getPositionsFetchResult = action.payload;
    });
    builder.addCase(fetchPlayerPositionsAsync.rejected, (state, action) => {
      state.getPositionsIsLoading = false;
      state.getPositionsError = action.error;
    });
    builder.addCase(fetchSinglePlayerAsync.pending, (state) => {
      state.getOnePlayerIsLoading = true;
    });
    builder.addCase(fetchSinglePlayerAsync.fulfilled, (state, action) => {
      state.getOnePlayerIsLoading = false;
      state.getOnePlayerFetchResult = action.payload;
    });
    builder.addCase(fetchSinglePlayerAsync.rejected, (state, action) => {
      state.getOnePlayerIsLoading = false;
      state.getOnePlayerError = action.error;
    });
    builder.addCase(fetchPlayersAsync.pending, (state) => {
      state.getPlayersIsLoading = true;
    });
    builder.addCase(fetchPlayersAsync.fulfilled, (state, action) => {
      state.getPlayersIsLoading = false;
      state.getPlayersFetchResult = action.payload;
    });
    builder.addCase(fetchPlayersAsync.rejected, (state, action) => {
      state.getPlayersIsLoading = false;
      state.getPlayersError = action.error;
    });
    builder.addCase(fetchUpdatePlayerById.pending, (state) => {
      state.updateIsLoading = true;
    });
    builder.addCase(fetchUpdatePlayerById.fulfilled, (state, action) => {
      state.updateIsLoading = false;
      state.updateFetchResult = action.payload;
    });
    builder.addCase(fetchUpdatePlayerById.rejected, (state, action) => {
      state.updateIsLoading = false;
      state.updateErrors = action.error;
    });
  },
});

export const playerReducer = playerSlice.reducer;

export const {
  playerReset,
  setSearchText,
  setPageNumber,
  setPageSize,
  setTeamIds,
  onePlayerReset,
} = playerSlice.actions;
