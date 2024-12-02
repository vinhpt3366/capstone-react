import fetcher from "../../apis/fetcher";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchLichChieuHtRap = createAsyncThunk("lichChieuHtRap/fetchLichChieuHtRap", async ({ maHeThongRap, maNhom }, { rejectWithValue }) => {
  try {
    const response = await fetcher.get(`/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${maHeThongRap}&maNhom=${maNhom}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data.content);
  }
});

const initialState = {
  lichChieuHtRap: {
    maHeThongRap: "",
    tenHeThongRap: "",
    lstCumRap: "",
  },
  isLoading: false,
  error: null,
};

const lichChieuHtRapSlice = createSlice({
  name: "lichChieuHtRap",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLichChieuHtRap.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchLichChieuHtRap.fulfilled, (state, action) => {
        state.isLoading = false;
        const content = action.payload.content;
        state.lichChieuHtRap.maHeThongRap = content[0].maHeThongRap;
        state.lichChieuHtRap.tenHeThongRap = content[0].tenHeThongRap;
        state.lichChieuHtRap.lstCumRap = content[0].lstCumRap;
      })
      .addCase(fetchLichChieuHtRap.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default lichChieuHtRapSlice.reducer;
