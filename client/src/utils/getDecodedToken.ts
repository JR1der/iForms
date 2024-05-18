import {jwtDecode} from "jwt-decode";

export const getDecodedToken = () => {
    const token = window.localStorage.getItem("accessToken");
    if (token) {
        try {
            return jwtDecode(token);
        } catch (err) {
            console.log('Invalid token');
            return null;
        }
    }
    return null;
}