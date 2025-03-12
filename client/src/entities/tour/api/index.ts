import { IServerResponse } from "../../../shared/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IAddTourData, IAddTourDataWithId, TourArrayType } from "../model";
import { axiosInstance } from "../../../shared/lib/axiosInstance";
import { handleAxiosError } from "../../../shared/utils/handleAxiosError";

export const TOUR_API_ENDPOINT = "/tour" as const;

enum TOUR_THUNK_TYPES {
  ADD_TOUR = "tour/create",
  GET_TOUR = "tour/get",
  UPDATE_TOUR = "tour/update",
  DELETE_TOUR = "tour/delete",
}

export const getTourThunk = createAsyncThunk<
  IServerResponse<TourArrayType>,
  void,
  { rejectValue: IServerResponse }
>(TOUR_THUNK_TYPES.GET_TOUR, async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get(TOUR_API_ENDPOINT);
    return data;
  } catch (error) {
    return rejectWithValue(handleAxiosError(error));
  }
});

export const addTourThunk = createAsyncThunk<
  IServerResponse<TourArrayType>,
  IAddTourData,
  { rejectValue: IServerResponse }
>(TOUR_THUNK_TYPES.ADD_TOUR, async (tourData, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.post(TOUR_API_ENDPOINT, tourData);
    return data;
  } catch (error) {
    return rejectWithValue(handleAxiosError(error));
  }
});

export const updateTourThunk = createAsyncThunk<
  IServerResponse<TourArrayType>,
  IAddTourDataWithId,
  { rejectValue: IServerResponse }
>(TOUR_THUNK_TYPES.UPDATE_TOUR, async (tourData, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.put(
      `TOUR_API_ENDPOINT/${tourData.id}`,
      tourData
    );
    return data;
  } catch (error) {
    return rejectWithValue(handleAxiosError(error));
  }
});

export const deleteTourThunk = createAsyncThunk<
  IServerResponse<TourArrayType>,
  IAddTourDataWithId,
  { rejectValue: IServerResponse }
>(TOUR_THUNK_TYPES.DELETE_TOUR, async (tourData, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.delete(
      `TOUR_API_ENDPOINT/${tourData.id}`
    );
    return data;
  } catch (error) {
    return rejectWithValue(handleAxiosError(error));
  }
});
