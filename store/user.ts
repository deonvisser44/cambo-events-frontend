import { UserStateType } from '@/utils/types';
import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit/dist/createAction';

const initialState: UserStateType = {
  user_id: '',
  isUserAuthenticated: false,
  authToken: '',
  hasAccessTokenBeenAddedToInterceptor: false,
  isAuthModalOpen: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<string>) => {
      state.user_id = action.payload;
    },
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isUserAuthenticated = action.payload;
    },
    setAuthToken: (state, action: PayloadAction<string>) => {
      state.authToken = action.payload;
    },
    setHasAccessTokenBeenAddedToInterceptor: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.hasAccessTokenBeenAddedToInterceptor = action.payload;
    },
    setIsAuthModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isAuthModalOpen = action.payload;
    },
  },
});

export const {
  setUserId,
  setIsAuthenticated,
  setAuthToken,
  setHasAccessTokenBeenAddedToInterceptor,
  setIsAuthModalOpen,
} = userSlice.actions;
export const selectUserState = (state: any) => state.user;
export default userSlice.reducer;
