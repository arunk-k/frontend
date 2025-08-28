import { createSlice } from "@reduxjs/toolkit"
import { fetchBooks, fetchBookById, addBook, addReview } from "./booksThunks"

const booksSlice = createSlice({

    name: "books",
    initialState: {
        books: [],
        book: null,
        reviews: [],
        loading: false,
        error: null,
        success: null,
    },
    reducers: {},

    extraReducers: (builder) => {

        // Get All Books

        builder.addCase(fetchBooks.pending, (state) => {
            state.loading = true
            state.error = null
        })

        builder.addCase(fetchBooks.fulfilled, (state, action) => {
            state.books = action.payload
            state.loading = false
        })

        builder.addCase(fetchBooks.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || "Failed to fetch books"
        })

        // Get Book By Id
        builder.addCase(fetchBookById.pending, (state) => {
            state.loading = true
            state.error = null
        })

        builder.addCase(fetchBookById.fulfilled, (state, action) => {
            state.book = action.payload.book
            state.reviews = action.payload.reviews || []
            state.loading = false
        })

        builder.addCase(fetchBookById.rejected, (state, action) => {
            state.book = null
            state.reviews = []
            state.loading = false
            state.error = action.error.message || "Failed to fetch book"
        });

        // Add Book
        builder.addCase(addBook.pending, (state) => {
            state.loading = true
            state.error = null
        })

        builder.addCase(addBook.fulfilled, (state, action) => {
            state.books.push(action.payload)
            state.success = "Book added successfully!"
            state.loading = false
        })

        builder.addCase(addBook.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || "Failed to add book"
        })

        // Add Review
        builder.addCase(addReview.fulfilled, (state, action) => {
            state.reviews.push(action.payload)
        })

    }
})

export default booksSlice.reducer;
