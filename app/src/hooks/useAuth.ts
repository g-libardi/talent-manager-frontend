
import axios from 'axios';
import useToast from './useToast';

const toast = useToast();

export interface Credentials {
    username: string;
    password: string;
}


async function login(credentials: Credentials) {
    try {
        const response = axios.post('/api/login/token-pair', credentials);
        toast.promise(response, 'Login successful!', 'Login failed, verify your credentials.');
        return (await response).data;
    } catch (error) {
        return Promise.reject(error);
    }
}


async function refreshToken() {
    try {
        const response = await axios.post('/api/login/access-token');
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}


async function logout() {
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
