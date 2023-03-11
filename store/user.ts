import { UserStateType } from '@/utils/types';
import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit/dist/createAction';

const initialState: UserStateType = {
  user_id: '',
  isUserAuthenticated: false,
  authToken: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Action to add comment
    setUserId: (state, action: PayloadAction<string>) => {
      state.user_id = action.payload;
    },
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isUserAuthenticated = action.payload;
    },
    setAuthToken: (state, action: PayloadAction<string>) => {
      state.authToken = action.payload
    }
  },
});

export const { setUserId, setIsAuthenticated, setAuthToken } = userSlice.actions;
export const selectUserState = (state: any) => state.user;
export default userSlice.reducer;
