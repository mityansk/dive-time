import { createSlice } from '@reduxjs/toolkit';
import { ILocation, LocationArrayType } from '../index';
import { getLocation } from '../index';
import { getLocationById } from '../api';

interface LocationState {
	locations: LocationArrayType;
	location: ILocation | null;
	loading: boolean;
	error: string | null;
}

const initialState: LocationState = {
	locations: [],
	location: null,
	loading: false,
	error: null,
};

const locationSlice = createSlice({
	name: 'location',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			// getLocations
			.addCase(getLocation.pending, state => {
				state.loading = true;
			})
			.addCase(getLocation.fulfilled, (state, action) => {
				state.loading = false;
				state.error = null;
				state.locations = action.payload;
				console.log(action.payload, 'Список локаций получен успешно');
			})
			.addCase(getLocation.rejected, (state, action) => {
				state.loading = false;
				state.error =
					action.payload?.message || 'Ошибка при нахождении локаций';
			})
			// getLocationById
			.addCase(getLocationById.pending, state => {
				state.loading = true;
			})
			.addCase(getLocationById.fulfilled, (state, action) => {
				state.loading = false;
				state.error = null;
				state.location = action.payload.data;
			})
			.addCase(getLocationById.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload?.message || 'Ошибка при получении локации';
			});
	},
});

export const locationReducer = locationSlice.reducer;
