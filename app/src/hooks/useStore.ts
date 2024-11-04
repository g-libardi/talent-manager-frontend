import { create } from 'zustand';
import { persist } from 'zustand/middleware';


interface AppState {
    auth: {
        accessToken: Object | null;
        refreshToken: Object | null;
        setAccessToken: (accessToken: Object) => void;
        setRefreshToken: (refreshToken: Object) => void;
    },
}


export default create(
    persist<AppState>((set) => ({
        auth: {
            accessToken: null,
            refreshToken: null,
            setAccessToken: (accessToken) => set((state) => ({ auth: { ...state.auth, accessToken: accessToken } })),
            setRefreshToken: (refreshToken) => set((state) => ({ auth: { ...state.auth, refreshToken: refreshToken } })),
        },
    }),
        {
            name: 'app-state',
        }
    ));
