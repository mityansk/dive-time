import { configureStore } from "@reduxjs/toolkit";
import { tourReducer } from "../../entities/tour/slice";

const store = configureStore({
  reducer: {
    tour: tourReducer
  }
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch