import {BaseLayout} from "../../layout/BaseLayout.tsx";
import {useEffect, useState} from "react";
import {useForm} from "../../hooks/useForm.ts";
import {useParams} from "react-router-dom";
import {Box, MenuItem, TextField} from "@mui/material";
import ErrorPage from "../../components/ErrorPage.tsx";
import Button from "@mui/material/Button";
import {EditFormQuestion} from "./components/EditFormQuestion.tsx";
import Container from "@mui/material/Container";

const questionTypes = [
    {value: 'shortAnswer', label: 'Short Answer'},
    {value: 'longAnswer', label: 'Long Answer'},
    {value: 'rating5', label: 'Rating (1-5)'},
    {value: 'rating10', label: 'Rating (1-10)'},
];

export const EditFormPage = () => {
    const {id} = useParams();
    const [forms, deleteForm, isLoading, isError] = useForm(id);
    const [title, setTitle] = useState('');
    const [questions, setQuestions] = useState([]);
    const [questionText, setQuestionText] = useState('');
    const [questionType, setQuestionType] = useState(questionTypes[0].value);
    const [error, setError] = useState("");
    const [errorType, setErrorType] = useState("");

    useEffect(() => {
        if (forms.data) {
            setTitle(forms.data.title || "");
            setQuestions(forms.data.questions || []);
        }
    }, [forms]);

    const handleAddQuestion = () => {
        const newQuestion = {question: questionText, type: questionType};
        setQuestions([...questions, newQuestion]);
        setQuestionText('');
        setQuestionType(questionTypes[0].value);
    }

    const handleDeleteQuestion = (index) => {
        setQuestions(questions.filter((_, i) => i !== index));
    };

    const updateQuestionText = (index, newText) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].question = newText;
        setQuestions(updatedQuestions);
    };

    const handleEditForm = async () => {
        try {
            const response = await fetch(`http://localhost:3000/form/update/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: title,
                    questions: questions,
                }),
            });
            const res = await response.json();

            if (res.status === "SUCCESS") {
                setError(res.message);
                setErrorType('success');
            } else {
                setError(res.message);
                setErrorType('warning');
            }
        } catch (error) {
            setError(`An error occurred while updating the form: ${error}`);
            setErrorType('error');
        }
    }

    if (isLoading) {
        return (
            <ErrorPage message="Loading..." type="info"/>
        )
    }

    if (isError) {
        return <ErrorPage message="An error occurred while loading the form." type="error"/>;
    }

    return (
        <BaseLayout>
            <Container>
                <Box my={4}>
                    {error && <ErrorPage message={error} type={errorType}/>}
                    <TextField
                        fullWidth
                        label="Title of the form"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        margin="normal"
                    />
                    <Button fullWidth variant="contained" color="primary" onClick={handleEditForm} sx={{mt: 2}}>
                        Edit Form
                    </Button>
                    <TextField
                        fullWidth
                        label="Question Header"
                        value={questionText}
                        onChange={(e) => setQuestionText(e.target.value)}
                        margin="normal"
                    />
                    <Box display="flex" sx={{
                        flexDirection: {xs: 'column', sm: 'row'},
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 2,
                        my: 2
                    }}>
                        <TextField
                            fullWidth
                            select
                            label="Type of Question"
                            value={questionType}
                            onChange={(e) => setQuestionType(e.target.value)}
                            margin="normal"
                        >
                            {questionTypes.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <Button sx={{
                            height: {xs:'40px',sm:'54px'} , // Same height as the TextField
                            mt: { xs: 1, sm:1}  // Adjust margin for smaller screens
                        }} fullWidth variant="contained" color="primary" onClick={handleAddQuestion}>
                            Add Question
                        </Button>
                    </Box>
                    {questions && questions.map((question, index) => (
                        <EditFormQuestion key={index} question={question} index={index}
                                          handleDeleteQuestion={handleDeleteQuestion}
                                          updateQuestionText={updateQuestionText}
                        />
                    ))}
                </Box>
            </Container>
        </BaseLayout>
    )
}