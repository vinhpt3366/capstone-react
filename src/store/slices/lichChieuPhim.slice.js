import fetcher from "../../apis/fetcher";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchLichChieuPhim = createAsyncThunk("lichChieuPhim/fetchLichChieuPhim", async (MaPhim, { rejectWithValue }) => {
  try {
    const response = await fetcher.get(`QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${MaPhim}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data.content);
  }
});

const initialState = {
  lichChieuPhim: {
    maPhim: "",
    tenPhim: "",
    danhGia: "",
    moTa: "",
    trailer: "",
    ngayKhoiChieu: "",
    heThongRapChieu: [],
    heThongRapChieuDetailsPage: [],
  },
  isLoading: false,
  error: null,
};

const lichChieuPhimSlice = createSlice({
  name: "lichChieuPhim",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLichChieuPhim.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchLichChieuPhim.fulfilled, (state, action) => {
        state.isLoading = false;
        state.lichChieuPhim = action.payload.content;
        const content = action.payload.content;

        state.lichChieuPhim.heThongRapChieuDetailsPage = content.heThongRapChieu;

        const layDanhSachRap = content.heThongRapChieu
          .map((heThong) => {
            return heThong.cumRapChieu
              .map((cumRap) => {
                return {
                  tenCumRap: cumRap.tenCumRap,
                  lichChieuPhim: cumRap.lichChieuPhim.map((lichChieu) => ({
                    maLichChieu: lichChieu.maLichChieu,
                    maRap: lichChieu.maRap,
                    tenRap: lichChieu.tenRap,
                    ngayChieuGioChieu: lichChieu.ngayChieuGioChieu,
                  })),
                };
              })
              .flat();
          })
          .flat();

        state.lichChieuPhim.heThongRapChieu = layDanhSachRap;
      })
      .addCase(fetchLichChieuPhim.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default lichChieuPhimSlice.reducer;
