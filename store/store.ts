import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { userSlice } from './user';
import { eventsSlice } from './events';

const store = () =>
  configureStore({
    reducer: {
      [userSlice.name]: userSlice.reducer,
      [eventsSlice.name]: eventsSlice.reducer,
    },
    devTools: true,
  });

export const storeWrapper = createWrapper(store);
