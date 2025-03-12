import { configureStore } from "@reduxjs/toolkit";
import { tourReducer } from "../../entities/tour/slice";

const store = configureStore({
  reducer: {
    tour: tourReducer
  }
})

export default store