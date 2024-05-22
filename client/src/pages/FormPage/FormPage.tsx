import {BaseLayout} from "../../layout/BaseLayout.tsx";
import {Box, Card, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {useForm} from "../../hooks/useForm.ts";
import {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
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
    const [forms, deleteForm, isLoading, isError] = useForm(id);
    const [error, setError] = useState("");
    const [answers, setAnswers] = useState([]);
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/formEdit/${id}`)
    };

    const handleAnswerChange = (index, answer) => {
        const updatedAnswers = [...answers];
        updatedAnswers[index] = answer;
        console.log(answer)
        setAnswers(updatedAnswers);
    };

    const handleSubmit = () => {
        console.log("Submit")
        const form = {
            email: user.email,
            questions: questions.map((q) => ({question: q.text, type: q.type})),
        }

        const responses = form.data.questions.map((question, index) => ({
            questionId: question.questionId,
            response: question.response,
            type: question.type
        }))
        console.log(responses)
    }

    return (
        <BaseLayout>
            <Container>
                <Box my={4}>
                    {isError && <ErrorPage message={error} type="error"/>}
                    {isLoading ? (
                        <ErrorPage message="Loading..." type="info"/>
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