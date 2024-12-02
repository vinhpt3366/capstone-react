import fetcher from "../../apis/fetcher";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchDatVe = createAsyncThunk("datVe/fetchDatVe", async (data, { getState, rejectWithValue }) => {
  try {
    const state = getState();
    const accessToken = state.user.currentUser?.accessToken;

    const response = await fetcher.post("/QuanLyDatVe/DatVe", data, {
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
  isLoading: false,
  error: null,
};

const datVeSlice = createSlice({
  name: "datVe",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDatVe.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDatVe.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchDatVe.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default datVeSlice.reducer;
