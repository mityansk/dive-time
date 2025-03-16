import { axiosInstance } from '@/shared/lib/axiosInstance';
import { IServerResponse } from '@/shared/types/index';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { ILocation, LocationArrayType } from '@/entities/location/index';

export const LOCATIONS_ENDPOINT = '/diveLocation' as const;

export enum LOCATION_THUNK_TYPES {
  GET_LOCATION = 'getLocation',
  GET_LOCATION_BY_ID = 'getLocationById',
}

export const getLocation = createAsyncThunk<
  LocationArrayType,
  void,
  { rejectValue: IServerResponse }
>(LOCATION_THUNK_TYPES.GET_LOCATION, async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get(LOCATIONS_ENDPOINT);
    return data;
  } catch (error) {
    const err = error as AxiosError<IServerResponse>;
    return rejectWithValue(err.response!.data);
  }
});

export const getLocationById = createAsyncThunk<
  IServerResponse<ILocation>,
  number,
  { rejectValue: IServerResponse }
>(LOCATION_THUNK_TYPES.GET_LOCATION_BY_ID, async (id, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get<IServerResponse<ILocation>>(
      `${LOCATIONS_ENDPOINT}/${id}`
    );
    return data;
  } catch (error) {
    const err = error as AxiosError<IServerResponse>;
    return rejectWithValue(err.response!.data);
  }
});
