import { configureStore, createSlice } from '@reduxjs/toolkit'
import {  } from '@reduxjs/toolkit'
const initialState = {
  company: [],
}

export const companySlice = createSlice({
  name: 'company',
  initialState: {
    list: [],
  },
  reducers: {
    setCompany: (state, action) => {
      state.list = action.payload;
    },
  },
})

export const { setCompany } = companySlice.actions

export default configureStore({
  initialState,
  reducer: {
    company: companySlice.reducer,
  },
})