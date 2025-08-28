import apiClient from "./apiClient";
import { baseUrl } from "./baseUrl"

export const addBookApi = async (data) => {

    const headers = {
        "Authorization": `Token ${localStorage.getItem('token')}`
    }
    return await apiClient(`${baseUrl}/books`, "POST", headers, data)
}

export const getBooksApi = async () => {
    return await apiClient(`${baseUrl}/books`, "GET")
}

export const getBookByIdApi = async (id) => {
    return await apiClient(`${baseUrl}/books/${id}`, "GET")
}

export const addReviewApi = async (bookId, data) => {

    const headers = {
        "Authorization": `Token ${localStorage.getItem("token")}`,
    }
    return await apiClient(`${baseUrl}/books/${bookId}/reviews`, "POST", headers, data)
}




