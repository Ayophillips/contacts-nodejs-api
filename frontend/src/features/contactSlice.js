import { createSlice } from '@reduxjs/toolkit';

const contactsSlice = createSlice({
    name: 'contacts',
    initialState: {
        contacts: [],
        currentContact: null,
        isLoading: false,
        error: null,
    },
    reducers: {
        setContacts: (state, action) => {
            state.contacts = action.payload;
        },
        addContact: (state, action) => {
            state.contacts.push(action.payload);
        },
        updateContactInList: (state, action) => {
            const index = state.contacts.findIndex(
                (contact) => contact._id === action.payload._id
            );
            if (index !== -1) {
                state.contacts[index] = action.payload;
            }
        },
        deleteContactFromList: (state, action) => {
            state.contacts = state.contacts.filter(
                (contact) => contact._id !== action.payload
            );
        },
    },
});

export const {
    setContacts,
    addContact,
    updateContactInList,
    deleteContactFromList,
} = contactsSlice.actions;
export default contactsSlice.reducer;
