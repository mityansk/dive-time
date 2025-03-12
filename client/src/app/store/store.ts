import { configureStore } from '@reduxjs/toolkit';
import { tourReducer } from '../../entities/tour/slice';
import { userReducer } from '@/entities/user/slice/userSlice';
import { authModalreducer } from '@/features/auth/slice/authModalSlice';
import { locationReducer } from '@/entities/location/slice/locationSlice';

const store = configureStore({
	reducer: {
    tour: tourReducer,
		user: userReducer,
		location: locationReducer,
		authModal: authModalreducer,
	},
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
