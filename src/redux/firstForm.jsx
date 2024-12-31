import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    name: "",
    email: "",
    password: "",
    conpassword: "",
    createdAt: "",
}

const stepOne = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        firstForm(state, action) {
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.password = action.payload.password;
            state.conpassword = action.payload.conpassword;
            state.createdAt = new Date().toISOString();
        },

    },
})

export const { firstForm } = stepOne.actions
export default stepOne.reducer

