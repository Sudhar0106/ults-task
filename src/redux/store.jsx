import { configureStore } from '@reduxjs/toolkit'
import addUserSlice from './firstForm'

export const store = configureStore({
    reducer: {
        adduser: addUserSlice,
    },
})

export const RootState = store.getState
export const AppDispatch = store.dispatch