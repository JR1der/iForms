import {BaseLayout} from "../layout/BaseLayout.tsx";
import {useAuth} from "../providers/AuthProvider.tsx";

export const HomePage = () => {
    const {user} = useAuth()

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