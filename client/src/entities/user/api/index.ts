import { axiosInstance, setAccessToken } from '@/shared/lib/axiosInstance';
import { IAuthResponseData, IUserSignInData, IUserSignUpData } from '../model';
import { IServerResponse } from '@/shared/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { handleAxiosError } from '@/shared/utils/handleAxiosError';

enum USER_API_ENDPOINTS {
  SIGN_IN = '/auth/signIn',
  SIGN_UP = '/auth/signUp',
  REFRESH = '/auth/refreshTokens',
  SIGN_OUT = '/auth/signOut',
  CONFIRM_EMAIL = '/auth/confirmEmail',
  RESET_PASSWORD = '/auth/resetPassword',
  FORGOT_PASSWORD = '/auth/forgotPassword',
  DELETE_USER = '/auth',
}

enum USER_THUNK_TYPES {
  SIGN_IN = 'user/signIn',
  SIGN_UP = 'user/signUp',
  REFRESH = 'user/refreshTokens',
  SIGN_OUT = 'user/signOut',
  CONFIRM_EMAIL = '/user/confirmEmail',
  RESET_PASSWORD = '/user/resetPassword',
  FORGOT_PASSWORD = '/user/forgotPassword',
  DELETE_USER = '/user/delete',
}

export const refreshTokensThunk = createAsyncThunk<
  IServerResponse<IAuthResponseData>,
  void,
  { rejectValue: IServerResponse }
>(USER_THUNK_TYPES.REFRESH, async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get(USER_API_ENDPOINTS.REFRESH);
    setAccessToken(data.data.accessToken);
    return data;
  } catch (error) {
    return rejectWithValue(handleAxiosError(error));
  }
});

export const signInThunk = createAsyncThunk<
  IServerResponse<IAuthResponseData>,
  IUserSignInData,
  { rejectValue: IServerResponse }
>(USER_THUNK_TYPES.SIGN_IN, async (userSignInData, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.post(
      USER_API_ENDPOINTS.SIGN_IN,
      userSignInData
    );
    setAccessToken(data.data.accessToken);
    return data;
  } catch (error) {
    return rejectWithValue(handleAxiosError(error));
  }
});

export const signUpThunk = createAsyncThunk<
  IServerResponse<IAuthResponseData>,
  IUserSignUpData,
  { rejectValue: IServerResponse }
>(USER_THUNK_TYPES.SIGN_UP, async (userSignUpData, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.post(
      USER_API_ENDPOINTS.SIGN_UP,
      userSignUpData
    );
    setAccessToken(data.data.accessToken);
    return data;
  } catch (error) {
    return rejectWithValue(handleAxiosError(error));
  }
});

export const signOutThunk = createAsyncThunk<
  IServerResponse,
  void,
  { rejectValue: IServerResponse }
>(USER_THUNK_TYPES.SIGN_OUT, async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get(USER_API_ENDPOINTS.SIGN_OUT);
    setAccessToken('');
    return data;
  } catch (error) {
    return rejectWithValue(handleAxiosError(error));
  }
});

export const deleteUserThunk = createAsyncThunk<
  IServerResponse,
  number,
  { rejectValue: IServerResponse }
>(USER_THUNK_TYPES.DELETE_USER, async (id, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.delete(
      `${USER_API_ENDPOINTS.DELETE_USER}/${id}`
    );

    setAccessToken('');
    return data;
  } catch (error) {
    return rejectWithValue(handleAxiosError(error));
  }
});

export const confirmEmailThunk = createAsyncThunk<
  IServerResponse<IAuthResponseData>,
  string | undefined,
  { rejectValue: IServerResponse }
>(USER_THUNK_TYPES.CONFIRM_EMAIL, async (token, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get(
      `${USER_API_ENDPOINTS.CONFIRM_EMAIL}?token=${token}`
    );
    return data;
  } catch (error) {
    return rejectWithValue(handleAxiosError(error));
  }
});

// Санка для запроса на восстановление пароля
export const forgotPasswordThunk = createAsyncThunk<
  IServerResponse,
  string,
  { rejectValue: IServerResponse }
>(USER_THUNK_TYPES.FORGOT_PASSWORD, async (email, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.post(
      USER_API_ENDPOINTS.FORGOT_PASSWORD,
      { email }
    );
    return data;
  } catch (error) {
    return rejectWithValue(handleAxiosError(error));
  }
});

// Санка для сброса пароля
export const resetPasswordThunk = createAsyncThunk<
  IServerResponse,
  { token: string | undefined; newPassword: string },
  { rejectValue: IServerResponse }
>(
  USER_THUNK_TYPES.RESET_PASSWORD,
  async ({ token, newPassword }, { rejectWithValue }) => {
    
    try {
      const { data } = await axiosInstance.post(
        `${USER_API_ENDPOINTS.RESET_PASSWORD}/${token}`,
        { token, newPassword }
      );
      return data;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);
