import {BaseLayout} from "../layout/BaseLayout.tsx";
import {useAuth} from "../providers/AuthProvider.tsx";

export const HomePage = () => {
    const {user} = useAuth()

    return (
        <BaseLayout>
            <h1>
                Welcome, {user ? `${user.firstName} ${user.lastName}` : "Guest"}
            </h1>
        </BaseLayout>
    )
}