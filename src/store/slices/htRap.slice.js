import fetcher from "../../apis/fetcher";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchHtRap = createAsyncThunk("htRap/fetchHtRap", async (_, { rejectWithValue }) => {
  try {
    const response = await fetcher.get(`/QuanLyRap/LayThongTinHeThongRap`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data.content);
  }
});

const initialState = {
  htRap: [],
  isLoading: false,
  error: null,
};

const htRapSlice = createSlice({
  name: "htRap",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHtRap.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchHtRap.fulfilled, (state, action) => {
        state.isLoading = false;
        state.htRap = action.payload.content;
      })
      .addCase(fetchHtRap.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default htRapSlice.reducer;
