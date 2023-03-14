import { SavedEventType, UserStateType } from '@/utils/types';
import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit/dist/createAction';

const initialState: UserStateType = {
  user_id: '',
  isUserAuthenticated: false,
  authToken: '',
  savedEvents: [],
  savedEventIds: [],
  hasAccessTokenBeenAddedToInterceptor: false,
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
    setSavedEvents: (state, action: PayloadAction<SavedEventType[]>) => {
      state.savedEvents = action.payload;
    },
    setSavedEventIds: (state, action: PayloadAction<string[]>) => {
      state.savedEventIds = action.payload;
    },
    setHasAccessTokenBeenAddedToInterceptor: (state, action: PayloadAction<boolean>) => {
      state.hasAccessTokenBeenAddedToInterceptor = action.payload;
    }
  },
});

export const {
  setUserId,
  setIsAuthenticated,
  setAuthToken,
  setSavedEvents,
  setSavedEventIds,
  setHasAccessTokenBeenAddedToInterceptor,
} = userSlice.actions;
export const selectUserState = (state: any) => state.user;
export default userSlice.reducer;
