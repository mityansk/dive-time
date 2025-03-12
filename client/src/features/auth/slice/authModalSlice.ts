import { createSlice } from '@reduxjs/toolkit';

type AuthModalState = {
  isOpen: boolean;
};

const initialState: AuthModalState = {
  isOpen: false,
};

const authModalSlice = createSlice({
  name: 'authModal',
  initialState,
  reducers: {
    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = authModalSlice.actions;
export const authModalreducer = authModalSlice.reducer;
