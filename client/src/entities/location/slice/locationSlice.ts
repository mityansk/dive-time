import { createSlice } from '@reduxjs/toolkit';
import { LocationArrayType } from '../index';
import { getLocation } from '../index';

interface LocationState {
	locations: LocationArrayType;
	loading: boolean;
	error: string | null;
}

const initialState: LocationState = {
	locations: [],
	loading: false,
	error: null,
};

const locationSlice = createSlice({
	name: 'location',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
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
				state.error = action.payload?.message || 'Failed to fetch locations';
			});
	},
});

export const locationReducer = locationSlice.reducer;
