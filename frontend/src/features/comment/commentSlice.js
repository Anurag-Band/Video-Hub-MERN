import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: 'IDLE',
  errorMessage: null,
  videoComments: null,
};
export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.statusMessage = null;
      state.status = 'IDLE';
    },
  },
  extraReducers: (builder) => {
    builder
      // for getComments  ->>
      .addCase(getVideoComments.fulfilled, (state, action) => {
        state.status = 'IDLE';
        state.videoComments = action.payload?.comments;
      })
      .addCase(getVideoComments.rejected, (state, action) => {
        state.status = 'ERROR';
        state.errorMessage = action.payload;
      });
  },
});

// get video Comments
export const getVideoComments = createAsyncThunk(
  'video/comments',
  async (videoId, { rejectWithValue }) => {
    try {
      const config = { headers: { 'Content-Type': 'application/json' } };
      const { data } = await axios.get(
        `/api/v1/video/comments/${videoId}`,
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const { clearErrors } = commentSlice.actions;

export default commentSlice.reducer;
