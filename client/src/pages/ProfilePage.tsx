import {BaseLayout} from "../layout/BaseLayout.tsx";
import {useAuth} from "../providers/AuthProvider.tsx";
import {Box, Typography} from "@mui/material";

export const ProfilePage = () => {
    const {user} = useAuth();

    return <BaseLayout>
        <Box>
            <Typography variant="h4" gutterBottom>
                Profile Information
            </Typography>
            {user && (
                <Box>
                    <Typography variant="subtitle1">
                        First Name: {user.firstName}
                    </Typography>
                    <Typography variant="subtitle1">
                        Last Name: {user.lastName}
                    </Typography>
                    <Typography variant="subtitle1">
                        Email: {user.email}
                    </Typography>
                </Box>
            )}
        </Box>
    </BaseLayout>
}