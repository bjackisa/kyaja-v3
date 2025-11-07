import { createSlice } from "@reduxjs/toolkit";

const initialState = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("buyNowProduct")) : null;

const buyNowSlice = createSlice({
  name: "buyNow",
  initialState,
  reducers: {
    setBuyNowProduct: (state:any, action:any) => {
      const product = action.payload;
      localStorage.setItem("buyNowProduct", JSON.stringify(product));
      return product;
    },
    clearBuyNowProduct: () => {
      localStorage.removeItem("buyNowProduct");
      return null;
    },
  },
});

export const { setBuyNowProduct, clearBuyNowProduct } = buyNowSlice.actions;
export default buyNowSlice.reducer;
