import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export type UserSliceState = {
  canSell: boolean;
  email: string | null;
  mobile: string | null;
  kycLevel: number;
  id64: number | null;
  tradeURL: string | null;
  steamAPIKey: string | null;
  isKnown: boolean | undefined;
  SESSIONID: string;
};

const initialState: UserSliceState = {
  id64: null,
  tradeURL: null,
  mobile: null,
  steamAPIKey: null,
  email: null,
  isKnown: undefined,
  canSell: false,
  kycLevel: 0,
  SESSIONID: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: (create) => ({
    newUserState: create.reducer(
      (state, action: PayloadAction<UserSliceState>) => {
        return action.payload;
      }
    ),
  }),

  selectors: {
    user: (user) => user,
    isKnown: (user) => user.isKnown,
  },
});

export const { newUserState } = userSlice.actions;

export const { user, isKnown } = userSlice.selectors;
