import {Route, RouteProps, Routes, useLocation, Navigate} from "react-router-dom";
import {LoginPage} from "./pages/auth/LoginPage.tsx";
import {RegisterPage} from "./pages/auth/RegisterPage.tsx";
import {HomePage} from "./pages/HomePage.tsx";
import {useAuth} from "./providers/AuthProvider.tsx";

export type RouteConfig = RouteProps & {
    path: string;
    isPrivate?: boolean;
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
        path: "auth/login",
        element: <LoginPage/>,
    },
    {
        path: "auth/signup",
        element: <RegisterPage/>
    },
];

export interface AuthRequiredProps {
    to?: string;
    children?: React.ReactNode;
}

export const AuthRequired: React.FC<AuthRequiredProps> = ({children, to = "/auth/login",}) => {
    const {user} = useAuth();
    const {pathname} = useLocation();

    if (!user && pathname !== to) {
        return <Navigate to={to} replace/>;
    }
    return <>{children}</>;
};

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