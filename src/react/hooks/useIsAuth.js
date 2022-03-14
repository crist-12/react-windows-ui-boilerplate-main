import { useAuthState } from "../stores/AuthStore";


export const useAuth = () => {
    const authState = useAuthState();
    return authState.get().isLoggedIn;
}