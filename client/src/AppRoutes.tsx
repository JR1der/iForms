import {Route, RouteProps, Routes, useLocation, Navigate} from "react-router-dom";
import {LoginPage} from "./pages/auth/LoginPage.tsx";
import {RegisterPage} from "./pages/auth/RegisterPage.tsx";
import {HomePage} from "./pages/HomePage.tsx";
import {useAuth} from "./providers/AuthProvider.tsx";
import {ProfilePage} from "./pages/ProfilePage.tsx";
import {FormsPage} from "./pages/FormsPage/FormsPage.tsx";
import {FormPage} from "./pages/FormPage/FormPage.tsx";
import {CreatePage} from "./pages/CreatePage/CreatePage.tsx";
import {EditFormPage} from "./pages/EditFormPage/EditFormPage.tsx";
import {ResponsePage} from "./pages/ResponsePage/ResponsePage.tsx";
import {ResponseDetailsPage} from "./pages/ResponseDetailsPage/ResponseDetailsPage.tsx";

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
        isPrivate: false,
        path: "/",
        element: <Navigate to="/home" replace/>,
        index: true,
    },
    {
        isPrivate: false,
        path: "/home",
        element: <HomePage/>,
    },
    {
        isPrivate: true,
        path: "/form/responses/:id",
        element: <ResponsePage/>,
    },
    {
        isPrivate: true,
        path: "/form/responseDetails/:id",
        element: <ResponseDetailsPage/>,
    },
    {
        isPrivate: true,
        path: "/forms/create",
        element: <CreatePage/>,
    },
    {
        isPrivate: true,
        path: "/forms",
        element: <FormsPage/>,
    },
    {
        isPrivate: false,
        path: "/form/:id",
        element: <FormPage/>,
    },
    {
        isPrivate: true,
        path: "/formEdit/:id",
        element: <EditFormPage/>,
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