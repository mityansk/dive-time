import { configureStore } from "@reduxjs/toolkit";
import { tourReducer } from "@/entities/tour/slice";
import { userReducer } from "@/entities/user/slice/userSlice";
import { authModalReducer } from "@/features/auth/slice/authModalSlice";
import { locationReducer } from "@/entities/location/slice/locationSlice";
import { equipmentsReducer } from "@/entities/equipment/slice";

const store = configureStore({
  reducer: {
    tour: tourReducer,
    user: userReducer,
    locationReducer: locationReducer,
    authModal: authModalReducer,
    equipments: equipmentsReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
