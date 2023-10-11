import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { initialState } from './initialState';
import {
  fetchContacts,
  addContacts,
  deleteContacts,
} from './contactsOperations';

const defaultStatus = {
  pending: 'pending',
  fulfilled: 'fulfilled',
  rejected: 'rejected',
};
const customActions = [fetchContacts, addContacts, deleteContacts];

const getCustomActions = status => {
  return customActions.map(el => el[status]);
};

const handlePending = state => {
  state.status = defaultStatus.pending;
};

const handleRejected = (state, { payload }) => {
  state.status = defaultStatus.rejected;
  state.error = payload;
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    filterContacts(state, action) {
      state.filter = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        state.status = defaultStatus.fulfilled;
        state.contacts = payload;
        state.error = '';
      })
      .addCase(addContacts.fulfilled, (state, { payload }) => {
        state.status = defaultStatus.fulfilled;
        state.contacts.unshift(payload);
        state.error = '';
      })
      .addCase(deleteContacts.fulfilled, (state, { payload }) => {
        state.status = defaultStatus.fulfilled;
        state.contacts = state.contacts.filter(
          contact => contact.id !== payload.id
        );
        state.error = '';
      })
      .addMatcher(
        isAnyOf(...getCustomActions(defaultStatus.pending)),
        handlePending
      )
      .addMatcher(
        isAnyOf(...getCustomActions(defaultStatus.rejected)),
        handleRejected
      );
  },
});

const persistConfig = {
  key: 'contacts',
  storage,
  whitelist: ['contacts'],
};

export const contactsReducer = persistReducer(
  persistConfig,
  contactsSlice.reducer
);

export const { filterContacts } = contactsSlice.actions;
export const { contactsReduce } = contactsSlice.reducer;
