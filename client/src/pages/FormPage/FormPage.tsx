import {BaseLayout} from "../../layout/BaseLayout.tsx";
import {Box, Card, CardContent, TextField, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {useForm} from "../../hooks/useForm.ts";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Container from "@mui/material/Container";
import ErrorPage from "../../components/ErrorPage.tsx";
import {useAuth} from "../../providers/AuthProvider.tsx";
import {FormQuestion} from "./components/FormQuestion.tsx";

const questionTypes = [
    {value: 'shortAnswer', label: 'Short Answer'},
    {value: 'longAnswer', label: 'Long Answer'},
    {value: 'rating5', label: 'Rating (1-5)'},
    {value: 'rating10', label: 'Rating (1-10)'},
];

export const FormPage = () => {
    const {user} = useAuth();
    const {id} = useParams();
    const [forms, deleteForm, isLoading, error] = useForm(id);


    const handleEdit = () => {
        console.log("edit")
        // Redirect or switch to the create page with the form data pre-filled for editing
        // This can be achieved using React Router or any navigation library you're using
    };

    const handleSubmit = () => {
        console.log("Submit")
    }

    return (
        <BaseLayout>
            <Container>
                <Box my={4}>
                    {error && <ErrorPage message={error} type="error"/>}
                    {isLoading ? (
                        <Typography>Loading...</Typography>
                    ) : (
                        <Box>
                            <Card sx={{p: 2}}>
                                <Typography variant="h5" component="h2">
                                    {forms.data?.title}
                                </Typography>
                            </Card>
                            {user?.email === forms.data?.createdBy &&
                                <Button fullWidth variant="contained" onClick={handleEdit}
                                        sx={{mt: 2}}>
                                    Edit Form
                                </Button>}
                            {forms.data?.questions && forms.data.questions.map((question, index) => (
                                <FormQuestion key={index} question={question} index={index}/>
                            ))}
                            <Button fullWidth variant="contained" onClick={handleSubmit}>
                                Submit Form
                            </Button>
                        </Box>
                    )}
                </Box>
            </Container>
        </BaseLayout>
    )
}