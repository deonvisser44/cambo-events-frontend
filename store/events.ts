import {
  EventType,
  EventsStateType,
  SavedEventType,
  UserStateType,
} from '@/utils/types';
import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit/dist/createAction';
import { DateTime } from 'ts-luxon';

const initialState: EventsStateType = {
  savedEvents: [],
  savedEventIds: [],
  userCreatedEvents: [],
  currentEvent: {
    id: '',
    host_id: '',
    name: '',
    description: '',
    start_date: DateTime.local().toISODate()!,
    end_date: DateTime.local().toISODate()!,
    location: { lat: 11.554032, lng: 104.924882 },
    image: { url: '', path: '' },
    category: [],
    area: 'PHNOM PENH',
  },
};

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setSavedEvents: (state, action: PayloadAction<SavedEventType[]>) => {
      state.savedEvents = action.payload;
    },
    setSavedEventIds: (state, action: PayloadAction<string[]>) => {
      state.savedEventIds = action.payload;
    },
    setUserCreatedEvents: (state, action: PayloadAction<EventType[]>) => {
      state.userCreatedEvents = action.payload;
    },
    setRemainingEventAfterDelete: (state) => {
      const remainingEvents = state.userCreatedEvents.filter(
        (event) => event.id !== state.currentEvent.id
      );
      state.userCreatedEvents = remainingEvents;
    },
    setCurrentEvent: (state, action: PayloadAction<EventType>) => {
      console.log('PAYLOAD', action.payload);
      state.currentEvent = action.payload;
    },
  },
});

export const {
  setSavedEvents,
  setSavedEventIds,
  setCurrentEvent,
  setUserCreatedEvents,
  setRemainingEventAfterDelete,
} = eventsSlice.actions;
export const selectEventsState = (state: any) => state.events;
export default eventsSlice.reducer;
