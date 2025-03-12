import { axiosInstance } from '@/shared/lib/axiosInstance';
import { IServerResponse } from '@/shared/types/index';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import {
	ILocation
} from '@/entities/location/index';

export const LOCATIONS_ENDPOINT = '/locations' as const;

export enum LOCATION_THUNK_TYPES {
	GET_LOCATION = 'GET_LOCATION',
}

export const getLocation = createAsyncThunk<
	IServerResponse<ILocation[]>,
	void,
	{ rejectValue: IServerResponse }
>(LOCATIONS_ENDPOINT, async (_, { rejectWithValue }) => {
	try {
		const { data } = await axiosInstance.get<IServerResponse<ILocation[]>>(
			LOCATION_THUNK_TYPES.GET_LOCATION
		);
		return data;
	} catch (error) {
		const err = error as AxiosError<IServerResponse>;
		return rejectWithValue(err.response!.data);
	}
});
