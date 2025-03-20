import {
  refreshTokensThunk,
  signInThunk,
  signUpThunk,
  signOutThunk,
  confirmEmailThunk,
  deleteUserThunk,
  resetPasswordThunk,
  forgotPasswordThunk,
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

const userSlice = createSlice({
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
      })

      // confirmEmailThunk
      .addCase(confirmEmailThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(confirmEmailThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data.user;
        state.error = null;
      })
      .addCase(confirmEmailThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.error = action.payload!.error ?? 'Unknown error';
      })

      // deleteUserThunk
      .addCase(deleteUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUserThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.error = null;
      })
      .addCase(deleteUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.error = action.payload!.error ?? 'Unknown error';
      })

      // forgotPasswordThunk
      .addCase(forgotPasswordThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPasswordThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(forgotPasswordThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload!.error ?? 'Unknown error';
      })

      // resetPasswordThunk
      .addCase(resetPasswordThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPasswordThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(resetPasswordThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload!.error ?? 'Unknown error';
      });
  },
});

export const userReducer = userSlice.reducer;
