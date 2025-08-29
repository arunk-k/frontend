import { createAsyncThunk } from "@reduxjs/toolkit"
import { loginUserApi, registerUserApi } from "../../services/authApi"


export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (data, { rejectWithValue }) => {
    try {
      const response = await registerUserApi(data)
      return response.data
    } catch (e) {
      if (!e.response) {
        return rejectWithValue({ message: "Something went wrong!!. Please try again later." })
      }
      return rejectWithValue(e.response.data)
    }
  }
)

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (data, { rejectWithValue }) => {
    try {
      const response = await loginUserApi(data)
      return response.data
    } catch (e) {
      if (!e.response) {
        return rejectWithValue({ message: "Something went wrong!!. Please try again later." })
      }
      return rejectWithValue(e.response.data || { message: "Login failed" })
    }
  }
)



