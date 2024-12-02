import fetcher from "../../apis/fetcher";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchLogin = createAsyncThunk("user/fetchLogin", async (data, { rejectWithValue }) => {
  try {
    const response = await fetcher.post("/QuanLyNguoiDung/DangNhap", data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data.content);
  }
});

export const fetchRegister = createAsyncThunk("user/fetchRegister", async (data, { rejectWithValue }) => {
  try {
    const response = await fetcher.post("/QuanLyNguoiDung/DangKy", data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data.content);
  }
});

const userLocal = JSON.parse(localStorage.getItem("user")) || null;

const initialState = {
  currentUser: userLocal,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, { payload }) => {
      localStorage.setItem("user", JSON.stringify(payload));
      state.currentUser = payload;
    },
    logout: (state) => {
      localStorage.removeItem("user");
      state.currentUser = null;
    },
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload.content;
        localStorage.setItem("user", JSON.stringify(action.payload.content));
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchRegister.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRegister.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { setCurrentUser, logout, resetError } = userSlice.actions;
export default userSlice.reducer;
