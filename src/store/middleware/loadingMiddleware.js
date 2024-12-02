import { showLoading, hideLoading } from "../slices/loading.slice";
const LOADING_ACTIONS = [
  "dsPhim/fetchDsPhim",
  "htRap/fetchHtRap",
  "lichChieuHtRap/fetchLichChieuHtRap",
  "lichChieuPhim/fetchLichChieuPhim",
  "user/fetchUser",
  "user/updateUser",
  "dsPhongVe/fetchDsPhongVe",
  "datVe/fetchDatVe",
  "ttNguoiDung/fetchTtNguoiDung",
];

const LOADING_MESSAGES = {
  "dsPhim/fetchDsPhim": "Đang tải...",
};

export const loadingMiddleware = (store) => (next) => (action) => {
  const baseActionType = action.type.split("/").slice(0, -1).join("/");

  if (LOADING_ACTIONS.includes(baseActionType)) {
    if (action.type.endsWith("/pending")) {
      store.dispatch(showLoading(LOADING_MESSAGES[baseActionType]));
    } else if (action.type.endsWith("/fulfilled") || action.type.endsWith("/rejected")) {
      store.dispatch(hideLoading());
    }
  }

  return next(action);
};
