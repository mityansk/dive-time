import { createSlice } from "@reduxjs/toolkit";
import { EquipmentArrayType } from "../model";
import {
  addEquipmentThunk,
  deleteEquipmentThunk,
  getEquipmentThunk,
  updateEquipmentThunk,
} from "../api";

type EquipmentState = {
  equipments: EquipmentArrayType;
  error: string | null;
  isLoading: boolean;
};

const initialState: EquipmentState = {
  equipments: [],
  error: null,
  isLoading: false,
};

const equipmentsSlice = createSlice({
  name: "equipments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEquipmentThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEquipmentThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.equipments = action.payload.data;
      })
      .addCase(getEquipmentThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload!.error ??
          "Неизвестная ошибка при получении снаряжения!";
      })
      .addCase(addEquipmentThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addEquipmentThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.equipments = [...state.equipments, action.payload.data];
      })
      .addCase(addEquipmentThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload!.error ??
          "Неизвестная ошибка при добавлении снаряжения!";
      })
      .addCase(updateEquipmentThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateEquipmentThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.equipments = state.equipments.map((equipment) =>
          equipment.id === action.payload.data.id
            ? action.payload.data
            : equipment
        );
      })
      .addCase(updateEquipmentThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload!.error ??
          "Неизвестная ошибка при обновлении снаряжения";
      })
      .addCase(deleteEquipmentThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteEquipmentThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.equipments = state.equipments.filter(
          (equipment) => equipment.id !== action.payload.data.id
        );
      })
      .addCase(deleteEquipmentThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload!.error ?? "Неизвестная ошибка при удалении снаряжения";
      });
  },
});
export const equipmentsReducer = equipmentsSlice.reducer;
