import { configureStore } from '@reduxjs/toolkit';
import { tourReducer } from '../../entities/tour/slice';
import { userReducer } from '@/entities/user/slice/userSlice';
import { authModalReducer } from '@/features/auth/slice/authModalSlice';

const store = configureStore({
  reducer: {
    tour: tourReducer,
    user: userReducer,
    authModal: authModalReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
