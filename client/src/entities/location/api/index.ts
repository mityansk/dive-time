import { axiosInstance } from '@/shared/lib/axiosInstance';
import { IServerResponse } from '@/shared/types/index';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { LocationArrayType } from '@/entities/location/index';

export const LOCATIONS_ENDPOINT = '/locations' as const;

export enum LOCATION_THUNK_TYPES {
	GET_LOCATION = 'getLocation',
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
