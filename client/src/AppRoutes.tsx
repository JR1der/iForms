import {Route, RouteProps, Routes, useLocation, Navigate} from "react-router-dom";
import {LoginPage} from "./pages/auth/LoginPage.tsx";
import {RegisterPage} from "./pages/auth/RegisterPage.tsx";
import {HomePage} from "./pages/HomePage.tsx";
import {useAuth} from "./providers/AuthProvider.tsx";
import {ProfilePage} from "./pages/ProfilePage.tsx";

export type RouteConfig = RouteProps & {
    path: string;
    isPrivate?: boolean;
};

export const AuthNotRequired: React.FC<AuthRequiredProps> = ({children, to = "/",}) => {
    const {user} = useAuth();

    if (user) {
        return <Navigate to={to} replace/>;
    }

    return <>{children}</>;
};

export const AuthRequired: React.FC<AuthRequiredProps> = ({children, to = "/auth/login",}) => {
    const {user} = useAuth();
    const {pathname} = useLocation();

    if (!user && pathname !== to) {
        return <Navigate to={to} replace/>;
    }
    return <>{children}</>;
};

export const routes: RouteConfig[] = [
    {
        isPrivate: true,
        path: "/",
        element: <Navigate to="/home" replace/>,
        index: true,
    },
    {
        isPrivate: true,
        path: "/home",
        element: <HomePage/>,
    },
    {
        isPrivate: false,
        path: "auth/login",
        element: (
            <AuthNotRequired>
                <LoginPage/>
            </AuthNotRequired>
        ),
    },
    {
        isPrivate: false,
        path: "auth/signup",
        element: (
            <AuthNotRequired>
                <RegisterPage/>
            </AuthNotRequired>
        ),
    },
    {
        path: "auth/logout",
        element: <Navigate to="/home" replace/>
    },
    {
        isPrivate: true,
        path: "/profile",
        element: <ProfilePage/>
    }
];

export interface AuthRequiredProps {
    to?: string;
    children?: React.ReactNode;
}

const renderRouteMap = (route: RouteConfig) => {
    const {isPrivate, element, ...rest} = route;
    const authRequiredElement = isPrivate ? (
        <AuthRequired>{element}</AuthRequired>
    ) : (
        element
    );
    return <Route key={route.path} element={authRequiredElement} {...rest} />;
};

export const AppRoutes = () => {
    return <Routes>{routes.map(renderRouteMap)}</Routes>
}