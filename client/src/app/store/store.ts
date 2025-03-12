import { configureStore } from '@reduxjs/toolkit';
import { tourReducer } from '../../entities/tour/slice';
import { userReducer } from '@/entities/user/slice/userSlice';
import { authModalReducer } from '@/features/auth/slice/authModalSlice';
import { locationReducer } from '@/entities/location/slice/locationSlice';

const store = configureStore({
  reducer: {
    tour: tourReducer,
    user: userReducer,
    locationReducer: locationReducer,
    authModal: authModalReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
