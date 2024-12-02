import fetcher from "../../apis/fetcher";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchDsPhongVe = createAsyncThunk("dsPhongVe/fetchDsPhongVe", async (MaLichChieu, { rejectWithValue }) => {
  try {
    const response = await fetcher.get(`/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${MaLichChieu}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data.content);
  }
});

const initialState = {
  dsPhongVe: {},
  isLoading: false,
  error: null,
};

const dsPhongVeSlice = createSlice({
  name: "dsPhongVe",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDsPhongVe.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDsPhongVe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dsPhongVe = action.payload.content;
      })
      .addCase(fetchDsPhongVe.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default dsPhongVeSlice.reducer;
