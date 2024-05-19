import React, {createContext, ReactNode} from "react";
import {useNavigate} from "react-router-dom";
import {useLocalStorage} from "../hooks/useLocalStorage.ts"

export type LoginUserData = {
    email: string;
    password: string;
};

export type RegisterUserData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};


export type User = {
    email: string;
    firstName: string;
    id: string;
    lastName: string;
    iat: number;
    exp: number;
    iss: string;
};

type AuthContext = {
    user: User | null;
    accessToken: string | null;
    isAuthenticated: boolean;
    onLogin: (loginData: LoginUserData) => Promise<{ error?: string }>;
    onRegister: (registerData: RegisterUserData) => Promise<{ error?: string }>;
    onLogout: () => void;
};

const authContext = createContext<AuthContext | null>(null);

export const AuthProvider = ({children}: { children: ReactNode }) => {
    const [accessToken, setAccessToken] = useLocalStorage<string | null>(
        "accessToken",
        null,
    );
    const navigate = useNavigate();

    const user = accessToken
        ? (JSON.parse(atob(accessToken.split(".")[1])) as User)
        : null;

    const onLogin = async (loginData: LoginUserData): Promise<{ error?: string }> => {
        const body = {
            email: loginData.email,
            password: loginData.password,
        };
        const res = await fetch("http://localhost:3000/user/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        const resBody = await res.json();

        if (resBody.status === "SUCCESS") {
            setAccessToken(resBody.accessToken);
            navigate("/");
            return {};
        } else {
            return {error: resBody.message};
        }
    };

    const onRegister = async (registerData: RegisterUserData): Promise<{ error?: string }> => {
        const body = {
            firstName: registerData.firstName,
            lastName: registerData.lastName,
            email: registerData.email,
            password: registerData.password,
        };

        const res = await fetch("http://localhost:3000/user/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        const resBody = await res.json();

        if (resBody.status === "SUCCESS") {
            return onLogin({email: registerData.email, password: registerData.password});
        } else {
            return {error: resBody.message};
        }
    };

    const onLogout = () => {
        setAccessToken(null);
        navigate("/");
    };
    return (
        <authContext.Provider
            value={{
                user,
                accessToken,
                isAuthenticated: false,
                onLogin,
                onRegister,
                onLogout,
            }}
        >
            {children}
        </authContext.Provider>
    );
};

export const useAuth = () => {
    const auth = React.useContext(authContext);
    if (!auth) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return auth;
};