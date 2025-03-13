import { IServerResponse } from '@/shared/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  IAddEquipmentData,
  IUpdateEquipmentData,
  EquipmentArrayType,
} from '../model';
import { axiosInstance } from '@/shared/lib/axiosInstance';
import { handleAxiosError } from '@/shared/utils/handleAxiosError';

export const EQUIPMENT_API_ENDPOINT = '/equipment';

enum EQUIPMENTS_THUNK_TYPES {
  ADD_EQUIPMENT = 'equipment/create',
  GET_EQUIPMENTS = 'equipments/get',
  UPDATE_EQUIPMENT = 'equipment/update',
  DELETE_EQUIPMENT = 'equipment/delete',
}

export const getEquipmentThunk = createAsyncThunk<
  IServerResponse<EquipmentArrayType>,
  void,
  { rejectValue: IServerResponse }
>(EQUIPMENTS_THUNK_TYPES.GET_EQUIPMENTS, async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get(EQUIPMENT_API_ENDPOINT);
    return data;
  } catch (error) {
    return rejectWithValue(handleAxiosError(error));
  }
});

export const addEquipmentThunk = createAsyncThunk<
  IServerResponse<IAddEquipmentData>,
  IAddEquipmentData,
  { rejectValue: IServerResponse }
>(
  EQUIPMENTS_THUNK_TYPES.ADD_EQUIPMENT,
  async (equipmentData, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(
        EQUIPMENT_API_ENDPOINT,
        equipmentData
      );
      return data;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);
export const updateEquipmentThunk = createAsyncThunk<
  IServerResponse<IAddEquipmentData>,
  IUpdateEquipmentData,
  { rejectValue: IServerResponse }
>(
  EQUIPMENTS_THUNK_TYPES.UPDATE_EQUIPMENT,
  async (equipmentData, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(
        `EQUIPMENT_API_ENDPOINT/${equipmentData.id}`,
        equipmentData
      );
      return data;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);
export const deleteEquipmentThunk = createAsyncThunk<
  IServerResponse<IAddEquipmentData>,
  IAddEquipmentData,
  {
    rejectValue: IServerResponse;
  }
>(
  EQUIPMENTS_THUNK_TYPES.DELETE_EQUIPMENT,
  async (equipmentData, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete(
        `EQUIPMENT_API_ENDPOINT/${equipmentData.id}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);
