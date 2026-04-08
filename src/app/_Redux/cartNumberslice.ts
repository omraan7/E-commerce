
import { createSlice, PayloadAction, } from "@reduxjs/toolkit";
import { getCartData } from "@/app/cart/cartAction";
import { getwishlistData } from "@/app/wishlist/cartAction";

import { createAsyncThunk } from "@reduxjs/toolkit";
type CartState = {
  cartNumber: number;
  wishNumber: number;
  loading: boolean;
  error: string | null;
};


const initialState: CartState = {
  cartNumber: 0,
  wishNumber: 0,
  loading: false,
  error: null,
};
type CartWishResponse = {
  cartNumber: number;
  wishNumber: number;
};

export const fetchCartAndWish = createAsyncThunk<
  CartWishResponse,
  void,
  { rejectValue: string }
>("cart/fetchCartAndWish", async (_, { rejectWithValue }) => {
  try {
    const cart = await getCartData();
    const wish = await getwishlistData();

    return {
      cartNumber: cart?.numOfCartItems || 0,
      wishNumber: wish?.count || 0,
    };
  } catch (err: any) {
    return rejectWithValue(err?.message || "Failed");
  }
});
// export const fetchCartAndWish = createAsyncThunk(
//   "cart/fetchCartAndWish",
//   async () => {
//     try {
//       const cart = await getCartData();
//       const wish = await getwishlistData();


//       return {
//         cartNumber: cart?.numOfCartItems || 0,
//         wishNumber: wish?.count || 0,
//       };
//     } catch (err ) {
//       return err
//       // rejectWithValue(err?.message  || "Failed  ");
//     }
//   }
// );

const cartNumberSlice = createSlice({
  name: "cartNumber",
  initialState,
  reducers: {
    setCartNumber: (state, action: PayloadAction<number>) => {
      state.cartNumber = action.payload;
    },
    setWishNumber: (state, action: PayloadAction<number>) => {
      state.wishNumber = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartAndWish.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartAndWish.fulfilled, (state, action) => {
        state.cartNumber = action.payload.cartNumber;
        state.wishNumber = action.payload.wishNumber;
        state.loading = false;
      })
      .addCase(fetchCartAndWish.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || action.error.message || "Something went wrong";
      });
  },
});

export const { setCartNumber, setWishNumber } = cartNumberSlice.actions;
export default cartNumberSlice.reducer;