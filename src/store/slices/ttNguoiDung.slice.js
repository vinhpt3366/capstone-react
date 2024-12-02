import fetcher from "../../apis/fetcher";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTtNguoiDung = createAsyncThunk("ttNguoiDung/fetchTtNguoiDung", async ({ taiKhoan }, { getState, rejectWithValue }) => {
  try {
    const state = getState();
    const accessToken = state.user.currentUser?.accessToken;
    const response = await fetcher.post("/QuanLyNguoiDung/ThongTinTaiKhoan", taiKhoan, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data.content);
  }
});

const initialState = {
  ttNguoiDung: {},
  isLoading: false,
  error: null,
};

const ttNguoiDungSlice = createSlice({
  name: "ttNguoiDung",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTtNguoiDung.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTtNguoiDung.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ttNguoiDung = action.payload.content;
      })
      .addCase(fetchTtNguoiDung.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default ttNguoiDungSlice.reducer;
