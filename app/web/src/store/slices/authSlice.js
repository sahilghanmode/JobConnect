import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../lib/axios";

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/auth/login', {
        email,
        password,
      });
      return { user: response.data.user, userProfile: response.data.userProfile };
    } catch (error) {
      return rejectWithValue(error.response?.data?.msg || 'Login failed');
    }
  }
);
export const signupUser = createAsyncThunk(
  "auth/signup",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/auth/signup", { name, email, password });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.msg || "Signup failed"
      );
    }
  }
);
export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/auth/verify-otp", { email, otp });
      return res.data.user;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.msg || "OTP verification failed"
      );
    }
  }
);
export const resendOtp = createAsyncThunk(
  "auth/resendOtp",
  async ({ email }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/auth/resend-otp", { email });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.msg || "Failed to resend OTP"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    userProfile: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
    setUser(state, action) {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.userProfile = action.payload.userProfile;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      

      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(resendOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resendOtp.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(resendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, setUser, clearError } = authSlice.actions;
export default authSlice.reducer;