import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: 'IDLE',
  errorMessage: null,
  allVideos: null,
  videoDetails: null,
};
export const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.statusMessage = null;
      state.status = 'IDLE';
    },
  },
  extraReducers: (builder) => {
    builder
      // for getVideos  ->>
      .addCase(getVideos.pending, (state) => {
        state.status = 'LOADING';
      })
      .addCase(getVideos.fulfilled, (state, action) => {
        state.status = 'IDLE';
        state.allVideos = action.payload?.videos;
      })
      .addCase(getVideos.rejected, (state, action) => {
        state.status = 'ERROR';
        state.errorMessage = action.payload;
      })

      // for getVideos  ->>
      .addCase(getVideoDetails.pending, (state) => {
        state.status = 'LOADING';
      })
      .addCase(getVideoDetails.fulfilled, (state, action) => {
        state.status = 'IDLE';
        state.videoDetails = action.payload?.video;
      })
      .addCase(getVideoDetails.rejected, (state, action) => {
        state.status = 'ERROR';
        state.errorMessage = action.payload;
      });
  },
});

// get all videos
export const getVideos = createAsyncThunk(
  'videos/all',
  async (_, { rejectWithValue }) => {
    try {
      const config = { headers: { 'Content-Type': 'application/json' } };
      const { data } = await axios.get('/api/v1/videos/all', config);

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// get video details
export const getVideoDetails = createAsyncThunk(
  'video/details',
  async (videoId, { rejectWithValue }) => {
    try {
      const config = { headers: { 'Content-Type': 'application/json' } };
      const { data } = await axios.get(`/api/v1/video/${videoId}`, config);

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const { clearErrors } = videoSlice.actions;

export default videoSlice.reducer;
