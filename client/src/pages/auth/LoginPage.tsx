import {BaseLayout} from "../../layout/BaseLayout.tsx";
import {useFormik} from "formik";
import {object, string} from "yup";
import Container from "@mui/material/Container";
import {Box, CssBaseline, Grid, Link, TextField, Typography} from "@mui/material";
import {useAuth, LoginUserData} from "../../providers/AuthProvider.tsx";
import Button from "@mui/material/Button";
import {useState} from "react";
import ErrorPage from "../../components/ErrorPage.tsx";

const validationSchema = object({
    email: string().email('Enter a valid email').required('Email is required'),
    password: string().required('Password is required'),
});
const initialFormValues: LoginUserData = {
    email: "",
    password: "",
};
export const LoginPage = () => {
    const [error, setError] = useState<string | null>(null);
    const {onLogin} = useAuth();

    const formik = useFormik({
        initialValues: initialFormValues,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            const result = await onLogin(values);
            if (result.error) {
                setError(result.error);
            }
        }
    });

    return (
        <BaseLayout>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>

                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5" fontWeight="bold">
                        Sign in
                    </Typography>
                    <Box sx={{mb: 2}}/>
                    <form onSubmit={formik.handleSubmit}>
                        {error && (
                            <ErrorPage message={error} type='error'/>
                        )}
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign In
                        </Button>
                        <Grid container justifyContent="center" alignItems="center">
                            <Link href="/auth/signup" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </form>
                </Box>
            </Container>
        </BaseLayout>
    );
}