import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFetchSuffix } from "../../api/dto/components.g";
import {
  AddNewPlayerState,
  IUpdatePlayerById,
  PlayerDtoPageResultState,
  PlayerPositionsState,
  SinglePlayerPageResultState,
} from "../../api/dto/player.g";
import {
  fetchAddPlayer,
  fetchPlayersAsync,
  fetchSinglePlayerAsync,
  fetchUpdatePlayerById,
  fetchPlayerPositionsAsync,
} from "./playerThunk";

const addInitialState: AddNewPlayerState = {
  isLoading: true,
  fetchResult: {},
  errors: null,
};

const addPlayerSlise = createSlice({
  name: "addPlayer",
  initialState: addInitialState,
  reducers: {
    reset: (state) => addInitialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAddPlayer.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAddPlayer.fulfilled, (state, action) => {
      state.isLoading = false;
      state.fetchResult = action.payload;
    });
    builder.addCase(fetchAddPlayer.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.error;
    });
  },
});

export const addPlayerReducer = addPlayerSlise.reducer;

const getPositionsInitialState: PlayerPositionsState = {
  isLoading: true,
  fetchResult: [],
  error: null,
};

const getPlayerPositionsSlice = createSlice({
  name: "getPlayerPositions",
  initialState: getPositionsInitialState,
  reducers: {
    reset: (state) => getPositionsInitialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPlayerPositionsAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPlayerPositionsAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.fetchResult = action.payload;
    });
    builder.addCase(fetchPlayerPositionsAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const getPlayerPositionsReducer = getPlayerPositionsSlice.reducer;

const getSinglePlayerinitialState: SinglePlayerPageResultState = {
  isLoading: true,
  fetchResult: {
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
  error: null,
};

const getSinglePlayerSlice = createSlice({
  name: "getSinglePlayer",
  initialState: getSinglePlayerinitialState,
  reducers: {
    reset: (state) => getSinglePlayerinitialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSinglePlayerAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchSinglePlayerAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.fetchResult = action.payload;
    });
    builder.addCase(fetchSinglePlayerAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const getSinglePlayerReducer = getSinglePlayerSlice.reducer;

const getPlayersInitialState: PlayerDtoPageResultState = {
  isLoading: true,
  fetchResult: {
    data: [],
    count: 0,
    page: 1,
    size: 6,
  },
  error: null,
};

const getPlayersSlice = createSlice({
  name: "getPlayers",
  initialState: getPlayersInitialState,
  reducers: {
    reset: (state) => getPlayersInitialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPlayersAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPlayersAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.fetchResult = action.payload;
    });
    builder.addCase(fetchPlayersAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const getPlayersReducer = getPlayersSlice.reducer;

const updatePlyerInitialState: IUpdatePlayerById = {
  isLoading: true,
  fetchResult: {},
  errors: null,
};

const updatePlayerByIdSlise = createSlice({
  name: "updatePlayerById",
  initialState: updatePlyerInitialState,
  reducers: {
    reset: (state) => updatePlyerInitialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUpdatePlayerById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUpdatePlayerById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.fetchResult = action.payload;
    });
    builder.addCase(fetchUpdatePlayerById.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.error;
    });
  },
});

export const updatePlayerByIdReducer = updatePlayerByIdSlise.reducer;

const playersFetchSuffixInitialState: IFetchSuffix = {
  searchText: "",
  pageNumber: 1,
  pageSize: 6,
  teamIds: "",
};

const playersFetchSuffixSlise = createSlice({
  name: "playersFetchSuffix",
  initialState: playersFetchSuffixInitialState,
  reducers: {
    resetSuffix: (state) => playersFetchSuffixInitialState,
    setSearchText: (state, action: PayloadAction<string>) => {
      state.pageNumber = 1;
      state.searchText = action.payload;
    },
    setPageNumber: (state, action: PayloadAction<number>) => {
      state.pageNumber = action.payload;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageNumber = 1;
      state.pageSize = action.payload;
    },
    setTeamIds: (state, action: PayloadAction<string>) => {
      state.pageNumber = 1;
      state.teamIds = action.payload;
    },
  },
});

export const {
  resetSuffix,
  setSearchText,
  setPageNumber,
  setPageSize,
  setTeamIds,
} = playersFetchSuffixSlise.actions;

export const playersFetchSuffixReducer = playersFetchSuffixSlise.reducer;
