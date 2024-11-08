
export interface AppState {
    auth: {
        accessToken: Object | null;
        refreshToken: Object | null;
        setAccessToken: (accessToken: Object | null) => void;
        setRefreshToken: (refreshToken: Object | null) => void;
    },

    candidates: {
        data: Candidate[];
        setData: (data: Candidate[]) => void;
        toEdit: number | null;
        setToEdit: (id: number | null) => void;
    }
}
