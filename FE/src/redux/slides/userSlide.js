import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    userName: "",
    email: "",
    role: "khachhang",
    access_token: "",
    id: ""
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateUser: (state, action) => {
            const { userName = '', email = '', access_token = '', role = 'khachhang', id = '' } = action.payload
            state.userName = userName;
            state.email = email;
            state.access_token = access_token;
            state.role = role;
            state.id = id;
        },
        resetUser: (state) => {
            state.userName = '';
            state.email = '';
            state.access_token = '';
            state.role = '';
            state.id = '';
        }
    }
})
export const { updateUser, resetUser } = userSlice.actions;
export default userSlice.reducer;