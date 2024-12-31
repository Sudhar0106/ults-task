import { configureStore } from '@reduxjs/toolkit'
import addUserFirst from './firstForm'
import addUserSecond from './secondForm'
import addUserSlice from './finalSubmision'

export const store = configureStore({
    reducer: {
        firstForm: addUserFirst,
        secondform: addUserSecond,
        finalForm: addUserSlice,
    },
})

export const RootState = store.getState
export const AppDispatch = store.dispatch