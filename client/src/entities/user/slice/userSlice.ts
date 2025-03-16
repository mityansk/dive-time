import {
  refreshTokensThunk,
  signInThunk,
  signUpThunk,
  signOutThunk,
} from '../api';

import { IUser } from '../model';
import { createSlice } from '@reduxjs/toolkit';

type UserState = {
  user: IUser | null;
  error: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
};

const initialState: UserState = {
  user: null,
  error: null,
  isLoading: false,
  isAuthenticated: false,
};

const userSLice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      ///* refreshTokensThunk
      .addCase(refreshTokensThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(refreshTokensThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.user = action.payload.data.user;
        state.isAuthenticated = true;
      })
      .addCase(refreshTokensThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload!.error ?? 'Unknown error';
        state.user = null;
        state.isAuthenticated = false;
      })

      ///* signInThunk
      .addCase(signInThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signInThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.user = action.payload.data.user;
        state.isAuthenticated = true;
      })
      .addCase(signInThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload!.error ?? 'Unknown error';
        state.user = null;
        state.isAuthenticated = false;
      })

      ///* signUpThunk
      .addCase(signUpThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUpThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.user = action.payload.data.user;
        state.isAuthenticated = true;
      })
      .addCase(signUpThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload!.error ?? 'Unknown error';
        state.user = null;
        state.isAuthenticated = false;
      })

      ///* signOutThunk
      .addCase(signOutThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signOutThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(signOutThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload!.error ?? 'Unknown error';
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const userReducer = userSLice.reducer;
