import {BrowserRouter as Router} from "react-router-dom";
import {AppRoutes} from "./AppRoutes.tsx";
import {AuthProvider} from "./providers/AuthProvider.tsx";

export const App = () => {
    return (
        <Router>
            <AuthProvider>
                <AppRoutes/>
            </AuthProvider>
        </Router>
    )
}
