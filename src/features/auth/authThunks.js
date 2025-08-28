import { createAsyncThunk } from "@reduxjs/toolkit"
import { loginUserApi, registerUserApi } from "../../services/authApi"


export const registerUser = createAsyncThunk('auth/registerUser', async (data, { rejectWithValue }) => {
    try {
        const response = await registerUserApi(data)
        console.log("Response:", response)
        return response.data
    } catch (e) {
        console.error(e.response?.data)
        return rejectWithValue(e.response?.data)
    }
}
)

export const loginUser = createAsyncThunk('auth/loginUser', async (data) => {
    try {
        const response = await loginUserApi(data)
        console.log("Response:", response)
        return response.data
    } catch (e) {
        console.error(e.response?.data)
        return rejectWithValue(e.response?.data)
    }
})

