
import axios from 'axios';
import useToast from './useToast';
import useStore from './useStore';


export interface Credentials {
    username: string;
    password: string;
}

export interface AccessToken {
    user_id: string;
}


export default function useAuth() {
    const toast = useToast();
    const store = useStore.setState;

    async function login(credentials: Credentials) {
        try {
            const response = axios.post('/api/login/token-pair', credentials);
            toast.promise(response, 'Login successful!', 'Login failed, verify your credentials.');
            const data = (await response).data;
            store((state) => ({
               auth: {
                    ...state.auth,
                    accessToken: data.access,
                    refreshToken: data.refresh,
               }
            }));
        } catch (error) {
            store((state) => ({
                auth: {
                    ...state.auth,
                    accessToken: null,
                    refreshToken: null,
                }
            }));
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
            store((state) => ({
                auth: {
                    ...state.auth,
                    accessToken: null,
                    refreshToken: null,
                }
            }));
        } catch (error) {
            return Promise.reject(error);
        }
    }


    // WARN: This function is just a placeholder, it should be replaced with a real user info fetcher
    function getUserInfo() {
        const token = useStore.getState().auth.accessToken as AccessToken;
        if (!token) return null;
        const userInfo = {
            username: `User ${token.user_id}`,
        }
        return userInfo;
    }


    return {
        login,
        refreshToken,
        logout,
        getUserInfo,
    }
}
