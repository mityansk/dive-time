import { equipmentsReducer } from "@/entities/equipment/slice";
import { userReducer } from "@/entities/user/slice/userSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    user: userReducer,
    equipments: equipmentsReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
