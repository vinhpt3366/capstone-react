import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
  name: "loading",
  initialState: {
    isLoading: false,
    loadingText: "Đang xử lý...",
  },
  reducers: {
    showLoading: (state, action) => {
      state.isLoading = true;
      state.loadingText = action.payload || "Đang xử lý...";
    },
    hideLoading: (state) => {
      state.isLoading = false;
      state.loadingText = "Đang xử lý...";
    },
  },
});

export const { showLoading, hideLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
