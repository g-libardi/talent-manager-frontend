import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AppState } from '@/types/store';


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
    )
);
