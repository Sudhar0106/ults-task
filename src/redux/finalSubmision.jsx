import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const finalForm = createSlice({
    name: 'todosFinal',
    initialState: [],
    reducers: {
        addUser(state, action) {
            state.push(action.payload)
            axios.post("http://localhost:3000/api/addUser", action.payload)
        },

    },
})

export const { addUser } = finalForm.actions
export default finalForm.reducer