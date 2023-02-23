import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isAuthenticated: false,
  user: null,
  status: 'IDLE',
  errorMessage: null,
};
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.statusMessage = null;
      state.status = 'IDLE';
    },
  },
  extraReducers: (builder) => {
    builder
      // for logoutUser ->>
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = 'IDLE';
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.status = 'ERROR';
      })
      // for signip ->>
      .addCase(signup.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload?.user;
        state.status = 'IDLE';
      })
      .addCase(signup.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.status = 'ERROR';
        state.errorMessage = action.payload;
      })
      // for loadUser & login ->>
      .addMatcher(
        isAnyOf(loadUser.fulfilled, login.fulfilled),
        (state, action) => {
          state.isAuthenticated = true;
          state.status = 'IDLE';
          state.user = action.payload?.user;
        }
      )
      .addMatcher(
        isAnyOf(loadUser.rejected, login.rejected),
        (state, action) => {
          state.isAuthenticated = false;
          state.status = 'ERROR';
          state.errorMessage = action.payload;
        }
      );
  },
});

export const loadUser = createAsyncThunk(
  'user/load',
  async (_, { rejectWithValue }) => {
    try {
      const config = { headers: { 'Content-Type': 'application/json' } };
      const { data } = await axios.get('/api/v1/me', config);

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const signup = createAsyncThunk(
  'user/signup',
  async (formData, { rejectWithValue }) => {
    try {
      const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      const { data } = await axios.post('/api/v1/signup', formData, config);

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const login = createAsyncThunk(
  'user/login',
  async (formData, { rejectWithValue }) => {
    try {
      const config = { headers: { 'Content-Type': 'application/json' } };
      const { data } = await axios.post('/api/v1/login', formData, config);

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/api/v1/logout');

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const { clearErrors } = userSlice.actions;

export default userSlice.reducer;
