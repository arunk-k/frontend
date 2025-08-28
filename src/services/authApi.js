import { baseUrl } from './baseUrl'
import apiClient from './apiClient'

export const registerUserApi = async (data) => {
    return await apiClient(`${baseUrl}/auth/register`, "POST", "", data)
}

export const loginUserApi = async (data) => {
    return await apiClient(`${baseUrl}/auth/login`, "POST", "", data)
}

