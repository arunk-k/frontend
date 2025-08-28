import { createAsyncThunk } from "@reduxjs/toolkit"
import { addBookApi, addReviewApi, getBookByIdApi, getBooksApi } from "../../services/booksApi"

export const addBook = createAsyncThunk("books/addBook", async (bookData) => {
    const response = await addBookApi(bookData);
    return response.data;
})

// fetch all books
export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
    const response = await getBooksApi()
    return response.data
})

// fetch book by id with reviews
export const fetchBookById = createAsyncThunk('books/fetchBookById', async (id) => {
    const response = await getBookByIdApi(id)
    return response.data
})

// add review
export const addReview = createAsyncThunk(
    "books/addReview",
    async ({ bookId, data }, { rejectWithValue }) => {
        try {
            const response = await addReviewApi(bookId, data)
            return response.data
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Failed to add review")
        }
    }
)
