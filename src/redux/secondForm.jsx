import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    mobile: "",
    date: "",
    bio: "",
    gender: "",
}
const stepTwo = createSlice({
    name: 'todosTwo',
    initialState,
    reducers: {
        secondForm(state, action) {
            state.mobile = action.payload.mobile;
            state.date = action.payload.date;
            state.bio = action.payload.bio;
            state.gender = action.payload.gender;
        },

    },
})

export const { secondForm } = stepTwo.actions
export default stepTwo.reducer