import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export type UserSliceState = {
  isKnown: boolean | undefined;
  totpActivated: boolean;
};

const initialState: UserSliceState = {
  isKnown: undefined,
  totpActivated: false,
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
