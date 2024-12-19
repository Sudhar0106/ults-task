import { createSlice } from '@reduxjs/toolkit'

const UserList = createSlice({
    name: 'todos',
    initialState: [],
    reducers: {
        addUser(state, action) {
            state.push({
                name: action.payload.name,
                email: action.payload.email,
                password: action.payload.password,
                conpassword: action.payload.conpassword,
                createdAt: new Date().toString(),
            })
        },

    },
})

export const { addUser } = UserList.actions
export default UserList.reducer

