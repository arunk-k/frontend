import { configureStore } from "@reduxjs/toolkit"
import booksReducer from "../../src/features/book/booksSlice"
import authReducer from "../../src/features/auth/authSlice"

const store = configureStore({
    reducer: {
        books: booksReducer,
        auth: authReducer,
    },
})

export default store
