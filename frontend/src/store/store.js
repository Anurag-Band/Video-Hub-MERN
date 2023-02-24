import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import videoReducer from '../features/video/videoSlice';
import commentReducer from '../features/comment/commentSlice';


export const store = configureStore({
  reducer: {
    user: userReducer,
    video: videoReducer,
    comment: commentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
