import fetcher from "../../apis/fetcher";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchDsPhim = createAsyncThunk("dsPhim/fetchDsPhim", async (maNhom, { rejectWithValue }) => {
  try {
    const response = await fetcher.get(`/QuanLyPhim/LayDanhSachPhim?maNhom=${maNhom}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data.content);
  }
});

const initialState = {
  dsPhim: [],
  isLoading: false,
  error: null,
};

const dsPhimSlice = createSlice({
  name: "dsPhim",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDsPhim.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDsPhim.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dsPhim = action.payload.content;
      })
      .addCase(fetchDsPhim.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default dsPhimSlice.reducer;
