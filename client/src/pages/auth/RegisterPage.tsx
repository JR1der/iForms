import {BaseLayout} from "../../layout/BaseLayout.tsx";
import {useFormik} from "formik";
import {object, string} from "yup";
import Container from "@mui/material/Container";
import {Box, CssBaseline, Grid, Link, TextField, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";
import {useState} from "react";

const validationSchema = object({
        firstName: string().required('First name is required'),
        lastName: string().required('Last name is required'),
        email: string().email('Enter a valid email').required('Email is required'),
        password: string().min(8).required('Password is required'),
    }
);

export type RegisterUserData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};

const initialFormValues: RegisterUserData = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
};

export const RegisterPage = () => {
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const onSubmitRegisterForm = async (values: RegisterUserData) => {
        const body = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password,
        };
        try {
            const res = await axios.post("http://localhost:3000/user/auth/signup", body);
            console.log(res.data);
            if (res.data.status === "FAILED") {
                setSuccess("");
                setError(res.data.message);
            }
            if (res.data.status === "SUCCESS") {
                setError("");
                setSuccess(res.data.message);
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                if (err.response) {
                    console.error("Error registering user:", err.response.data);
                } else if (err.request) {
                    console.error("Error registering user: No response received");
                }
            } else {
                console.error("Error registering user:", (err as Error).message);
            }
        }
    };

    const formik = useFormik({
        initialValues: initialFormValues,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            onSubmitRegisterForm(values);
        },
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
                        Sign Up
                    </Typography>
                    {error && (
                        <Typography variant="body1" color="error" align="center">
                            {error}
                        </Typography>
                    )}
                    {success && (
                        <Typography variant="body1" color="green" align="center">
                            {success}
                        </Typography>
                    )}
                    <form onSubmit={formik.handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    name="firstName"
                                    autoComplete="firstName"
                                    autoFocus
                                    value={formik.values.firstName}
                                    onChange={formik.handleChange}
                                    error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                    helperText={formik.touched.firstName && formik.errors.firstName}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="lastName"
                                    value={formik.values.lastName}
                                    onChange={formik.handleChange}
                                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                    helperText={formik.touched.lastName && formik.errors.lastName}
                                />
                            </Grid>
                        </Grid>
                        <TextField
                            margin="normal"
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                        <TextField
                            margin="normal"
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
                            Sign Up
                        </Button>
                        <Grid container justifyContent="center" alignItems="center">
                            <Link href="/auth/login" variant="body2">
                                {"Already have an account? Sign In"}
                            </Link>
                        </Grid>

                    </form>
                </Box>
            </Container>
        </BaseLayout>
    );
}