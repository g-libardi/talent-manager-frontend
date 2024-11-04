
import axios from 'axios';


export interface Credentials {
    username: string;
    password: string;
}


export async function login(credentials: Credentials) {
    try {
        const response = await axios.post('/api/login/token-pair', credentials);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}


export async function refreshToken() {
    try {
        const response = await axios.post('/api/login/access-token');
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}


export async function logout() {
    try {
        await axios.delete('/api/login/token-pair');
    } catch (error) {
        return Promise.reject(error);
    }
}


export default function useAuth() {
    return {
        login,
        refreshToken,
        logout,
    }
}
