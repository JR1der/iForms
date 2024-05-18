import {useEffect, useState} from "react";
import {getDecodedToken} from "../utils/getDecodedToken.ts";
import {useNavigate} from "react-router-dom";
import {BaseLayout} from "../layout/BaseLayout.tsx";

interface DecodedToken {
    firstName: string;
    lastName: string;
    email: string;
    exp: number;
    iat: number;
}

export const HomePage = () => {
    const [user, setUser] = useState<DecodedToken | null | undefined>(undefined);
    const navigate = useNavigate();

    useEffect(() => {
        const decodedToken = getDecodedToken() as DecodedToken | null;
        if (decodedToken && decodedToken.exp > Date.now() / 1000) {
            setUser(decodedToken);
        } else {
            localStorage.removeItem("accessToken");
            setUser(null);
            navigate('/auth/login');
        }
    }, [navigate]);
    return (
        <BaseLayout>
            {user ? (
                <h1>Welcome, {user.firstName} {user.lastName}</h1>
            ) : (
                <p>Loading...</p>
            )}
        </BaseLayout>
    )
}