import { IServerResponse } from '@/shared/types'
import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  DeleteTourIdType,
	IAddTourData,
	IAddTourDataWithId,
	ITour,
	TourArrayType,
} from '../model'
import { axiosInstance } from '@/shared/lib/axiosInstance'
import { handleAxiosError } from '@/shared/utils/handleAxiosError'

export const TOUR_API_ENDPOINT = "/tour" as const;

enum TOUR_THUNK_TYPES {
	ADD_TOUR = 'tour/create',
	GET_TOUR = 'tour/get',
	GET_TOUR_BY_ID = 'tour/getById',
	UPDATE_TOUR = 'tour/update',
	DELETE_TOUR = 'tour/delete',
}

export const getTourThunk = createAsyncThunk<
  IServerResponse<TourArrayType>,
  void,
  { rejectValue: IServerResponse }
>(TOUR_THUNK_TYPES.GET_TOUR, async (_, { rejectWithValue }) => {
	try {
		const { data } = await axiosInstance.get(TOUR_API_ENDPOINT)
		return data
	} catch (error) {
		return rejectWithValue(handleAxiosError(error))
	}
})

export const getTourByIdThunk = createAsyncThunk<
	IServerResponse<ITour>,
	number,
	{ rejectValue: IServerResponse }
>(TOUR_THUNK_TYPES.GET_TOUR_BY_ID, async (id, { rejectWithValue }) => {
	try {
		const { data } = await axiosInstance.get(`${TOUR_API_ENDPOINT}/${id}`)
		return data
	} catch (error) {
		return rejectWithValue(handleAxiosError(error))
	}
})

export const addTourThunk = createAsyncThunk<
  IServerResponse<ITour>,
  IAddTourData,
  { rejectValue: IServerResponse }
>(TOUR_THUNK_TYPES.ADD_TOUR, async (tourData, { rejectWithValue }) => {
  const params = new URLSearchParams();
  for (const k of Object.keys(tourData) as (keyof IAddTourData)[]) {
    params.append(k, String(tourData[k]));
  }
  try {
    const { data } = await axiosInstance.post(TOUR_API_ENDPOINT, params, {
      headers: {
        ['Content-Type']: 'application/x-www-form-urlencoded',
        Accept: '*/*',
        'accept-encoding': 'gzip, deflate, br',
      },
    });
    return data;
  } catch (error) {
    return rejectWithValue(handleAxiosError(error));
  }
});

export const updateTourThunk = createAsyncThunk<
	IServerResponse<ITour>,
	IAddTourDataWithId,
	{ rejectValue: IServerResponse }
>(TOUR_THUNK_TYPES.UPDATE_TOUR, async (tourData, { rejectWithValue }) => {
	const params = new URLSearchParams();
				for (const k of Object.keys(tourData) as (keyof IAddTourDataWithId)[]) {
          params.append(k, String(tourData[k]));
        }
	try {
		const { data } = await axiosInstance.put(
      `${TOUR_API_ENDPOINT}/${tourData.id}`,
      params,
      {
        headers: {
          ['Content-Type']: 'application/x-www-form-urlencoded',
          Accept: '*/*',
          'accept-encoding': 'gzip, deflate, br',
        },
      }
    );
		return data
	} catch (error) {
		return rejectWithValue(handleAxiosError(error))
	}
})

export const deleteTourThunk = createAsyncThunk<
  IServerResponse<DeleteTourIdType>,
  DeleteTourIdType,
  { rejectValue: IServerResponse }
>(TOUR_THUNK_TYPES.DELETE_TOUR, async (tourData, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.delete(
      `${TOUR_API_ENDPOINT}/${tourData}`
    );
    return data;
  } catch (error) {
    return rejectWithValue(handleAxiosError(error));
  }
});
