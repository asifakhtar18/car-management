import axios from "axios";

import { baseUrl } from "../lib/contansts";


export const checkServer = async () => {
    try {
        const response = await axios.get(baseUrl)
        return response
    } catch (error) {
        console.log(error)
    }
}

export const login = async (email, password) => {
    try {
        const response = await axios.post(`${baseUrl}/users/login`, { email, password });
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        return {
            success: true,
            user: response.data.user
        };
    } catch (error) {
        return {
            success: false,
            error: error.response.data.error
        }
    }
}


export const register = async (name, email, password) => {
    try {
        const response = await axios.post(`${baseUrl}/users/register`, { name, email, password });
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        return {
            success: true,
            user: response.data.user
        };
    } catch (error) {
        return {
            success: false,
            error: error.response.data.error
        }
    }
}