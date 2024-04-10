import { createSlice } from '@reduxjs/toolkit'
import { addContact, deleteContact, fetchContacts } from '../redux/contactsOps'
import { createSelector } from '@reduxjs/toolkit'

export const selectFilteredContacts = createSelector(
	state => state.contacts.items,
	state => state.contacts.filter,
	(contacts, filter) => {
		if (!filter) {
			return contacts
		}

		return contacts.filter(
			contact =>
				contact.name.toLowerCase().includes(filter.toLowerCase()) ||
				contact.phone.includes(filter)
		)
	}
)

const initialState = { items: [], isLoading: false, error: null }

const handlePending = state => {
	state.isLoading = true
}

const handleRejected = (state, action) => {
	state.isLoading = false
	state.error = action.payload
}

const contactsSlice = createSlice({
	name: 'contacts',
	initialState,
	extraReducers: builder => {
		builder
			.addCase(fetchContacts.pending, handlePending)
			.addCase(fetchContacts.fulfilled, (state, action) => {
				state.isLoading = false
				state.error = null
				state.items = action.payload
			})
			.addCase(fetchContacts.rejected, handleRejected)
			.addCase(addContact.pending, handlePending)
			.addCase(addContact.fulfilled, (state, action) => {
				state.isLoading = false
				state.error = null
				state.items.push(action.payload)
			})
			.addCase(addContact.rejected, handleRejected)
			.addCase(deleteContact.pending, handlePending)
			.addCase(deleteContact.fulfilled, (state, action) => {
				state.isLoading = false
				state.error = null
				const index = state.items.findIndex(i => i.id === action.payload.id)
				state.items.splice(index, 1)
			})
			.addCase(deleteContact.rejected, handleRejected)
	},
})

export const contactsReducer = contactsSlice.reducer
