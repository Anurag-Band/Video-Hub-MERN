import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import videoReducer from '../features/video/videoSlice';


export const store = configureStore({
  reducer: {
    user: userReducer,
    video: videoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
