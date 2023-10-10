import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { initialState } from './initialState';
import {
  fetchContacts,
  addContacts,
  deleteContacts,
} from './contactsOperations';

const handlePending = (state)=>{
  state.status='pending'
};

const handleRejected = (state, { payload }) => {
  state.status = 'rejected';
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
  extraReducers:
    // [fetchContacts.pending]: state => {
    //   state.status = 'pending';
    // },
    // [fetchContacts.fulfilled]: (state, { payload }) => {
    //   state.status = 'fulfilled';
    //   state.contacts = payload;
    //   state.error = '';
    // },
    // [fetchContacts.rejected]: (state, { payload }) => {
    //   state.status = 'rejected';
    //   state.error = payload;
    // },
    // [addContacts.pending]: state => {
    //   state.status = 'pending';
    // },
    // [addContacts.fulfilled]: (state, { payload }) => {
    //   state.status = 'fulfilled';
    //   state.contacts.unshift(payload);
    //   state.error = '';
    // },
    // [addContacts.rejected]: (state, { payload }) => {
    //   state.status = 'rejected';
    //   state.error = payload;
    // },

    // [deleteContacts.pending]: state => {
    //   state.status = 'pending';
    // },
    // [deleteContacts.fulfilled]: (state, { payload }) => {
    //   state.status = 'fulfilled';
    //   state.contacts=state.contacts.filter(contact => contact.id!== payload.id);
    //   state.error = '';
    // },
    // [deleteContacts.rejected]: (state, { payload }) => {
    //   state.status = 'rejected';
    //   state.error = payload;
    // },
    builder => {
      builder
        .addCase(fetchContacts.pending, handlePending)
        .addCase(fetchContacts.fulfilled, (state, { payload }) => {
          state.status = 'fulfilled';
          state.contacts = payload;
          state.error = '';
        })
        .addCase(fetchContacts.rejected, handleRejected)
        .addCase(addContacts.pending, handlePending)
        .addCase(addContacts.fulfilled, (state, { payload }) => {
          state.status = 'fulfilled';
          state.contacts.unshift(payload);
          state.error = '';
        })
        .addCase(addContacts.rejected, handleRejected)
        .addCase(deleteContacts.pending, handlePending)
        .addCase(deleteContacts.fulfilled, (state, { payload }) => {
          state.status = 'fulfilled';
          state.contacts = state.contacts.filter(
            contact => contact.id !== payload.id
          );
          state.error = '';
        })
        .addCase(deleteContacts.rejected, handleRejected);
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

export const { addContact, deleteContact, filterContacts } =
  contactsSlice.actions;
