import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/user.slice";
import dsPhimSlice from "./slices/dsPhim.slice";
import htRapSlice from "./slices/htRap.slice";
import lichChieuHtRapSlice from "./slices/htRap.lichChieu.slice";
import lichChieuPhimSlice from "./slices/lichChieuPhim.slice";
import dsPhongVeSlice from "./slices/dsPhongVe.slice";
import datVeSlice from "./slices/datVe.slice";
import ttNguoiDungSlice from "./slices/ttNguoiDung.slice";

import loadingSlice from "./slices/loading.slice";
import { loadingMiddleware } from "./middleware/loadingMiddleware";

const store = configureStore({
  reducer: {
    user: userSlice,
    dsPhim: dsPhimSlice,
    htRap: htRapSlice,
    lichChieuHtRap: lichChieuHtRapSlice,
    lichChieuPhim: lichChieuPhimSlice,
    dsPhongVe: dsPhongVeSlice,
    datVe: datVeSlice,
    ttNguoiDung: ttNguoiDungSlice,

    loading: loadingSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loadingMiddleware),
});

export default store;
