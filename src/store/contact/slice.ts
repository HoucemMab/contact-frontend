import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { IContact, FormStatus } from "types";
import type { RootState } from "store";
import * as contactProvider from "providers/contact";

// Define the initial state using that type
interface IContactState {
  list: IContact[];
  page: number;
  formStatus: FormStatus;
}
const initialState: IContactState = {
  list: [],
  page: 0,
  formStatus: FormStatus.NONE,
};

export const getContacts = createAsyncThunk(
  "/contacts/getContacts",
  // limit = 50 assumes to loading all contacts on loading.
  ({ page = 1, limit = 50 }: { page?: number; limit?: number }) => {
    return contactProvider.getContactsRequest(page, limit);
  }
);

export const addContact = createAsyncThunk(
  "/contacts/createContact",
  (contactInfo: FormData) => {
    return contactProvider.addContactRequest(contactInfo);
  }
);

export const updateContact = createAsyncThunk(
  "/contacts/updateContact",
  ({ id, data }: { id: number; data: FormData }) =>
    contactProvider.updateContactRequest(id, data)
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  (id: number) => contactProvider.deleteContactRequest(id)
);

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    updateFormStatus: (state, action: PayloadAction<FormStatus>) => {
      state.formStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getContacts.fulfilled, (state, action) => {
      state.list = action.payload as IContact[];
    });

    // Add a Contact
    builder
      .addCase(addContact.fulfilled, (state, action) => {
        state.list.push(action.payload as IContact);
        state.formStatus = FormStatus.SUCCESS;
      })
      .addCase(addContact.pending, (state) => {
        state.formStatus = FormStatus.PENDING;
      })
      .addCase(addContact.rejected, (state) => {
        state.formStatus = FormStatus.FAILURE;
      });

    builder
      .addCase(updateContact.fulfilled, (state, action) => {
        const _contact = action.payload as IContact;
        state.list = state.list.map((contact) =>
          contact.id === _contact.id ? _contact : contact
        );
        state.formStatus = FormStatus.SUCCESS;
      })
      .addCase(updateContact.pending, (state) => {
        state.formStatus = FormStatus.PENDING;
      })
      .addCase(updateContact.rejected, (state) => {
        state.formStatus = FormStatus.FAILURE;
      });

    builder
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.list = state.list.filter(
          (contact) => contact.id !== (action.payload as IContact).id
        );
        state.formStatus = FormStatus.SUCCESS;
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.formStatus = FormStatus.FAILURE;
      });
  },
});

export const { updateFormStatus } = contactSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.contacts;

export default contactSlice.reducer;
