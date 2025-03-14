import { createSlice } from '@reduxjs/toolkit';
import {
	addTourThunk,
	deleteTourThunk,
	getTourByIdThunk,
	getTourThunk,
	updateTourThunk,
} from '../api'
import { ITour, TourArrayType } from '../model'

type TourState = {
	tour: TourArrayType
	one_tour: ITour | null
	error: string | null
	isLoading: boolean
}

const initialState: TourState = {
	tour: [],
	one_tour: null,
	error: null,
	isLoading: false,
}

const tourSlice = createSlice({
	name: 'tour',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(getTourThunk.pending, state => {
				state.isLoading = true
			})
			.addCase(getTourThunk.fulfilled, (state, action) => {
				state.isLoading = false
				state.error = null
				state.tour = action.payload.data
			})
			.addCase(getTourThunk.rejected, (state, action) => {
				state.isLoading = false
				state.error =
					action.payload!.error ?? 'Неизвестная ошибка при получении туров!'
			})
			.addCase(getTourByIdThunk.pending, state => {
				state.isLoading = true
			})
			.addCase(getTourByIdThunk.fulfilled, (state, action) => {
				state.isLoading = false
				state.error = null
				state.one_tour = action.payload.data
			})
			.addCase(getTourByIdThunk.rejected, (state, action) => {
				state.isLoading = false
				state.error =
					action.payload!.error ?? 'Неизвестная ошибка при получении туров!'
			})
			.addCase(addTourThunk.pending, state => {
				state.isLoading = true
			})
			.addCase(addTourThunk.fulfilled, (state, action) => {
				state.isLoading = false
				state.error = null
				state.tour = [...state.tour, action.payload.data]
			})
			.addCase(addTourThunk.rejected, (state, action) => {
				state.isLoading = false
				state.error =
					action.payload!.error ?? 'Неизвестная ошибка при добавлении туров!'
			})
			.addCase(updateTourThunk.pending, state => {
				state.isLoading = true
			})
			.addCase(updateTourThunk.fulfilled, (state, action) => {
				state.isLoading = false
				state.error = null
				state.tour = state.tour.map(tour_el =>
					tour_el.id === action.payload.data.id ? action.payload.data : tour_el
				)
			})
			.addCase(updateTourThunk.rejected, (state, action) => {
				state.isLoading = false
				state.error =
					action.payload!.error ?? 'Неизвестная ошибка при обновлении туров!'
			})
			.addCase(deleteTourThunk.pending, state => {
				state.isLoading = true
			})
			.addCase(deleteTourThunk.fulfilled, (state, action) => {
				state.isLoading = false
				state.error = null
				state.tour = state.tour.filter(
					tour_el => tour_el.id !== action.payload.data.id
				)
			})
			.addCase(deleteTourThunk.rejected, (state, action) => {
				state.isLoading = false
				state.error =
					action.payload!.error ?? 'Неизвестная ошибка при удалении туров!'
			})
	},
})

export const tourReducer = tourSlice.reducer;
