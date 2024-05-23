import {BaseLayout} from "../../layout/BaseLayout.tsx";
import {useState} from "react";
import Container from "@mui/material/Container";
import {Box, MenuItem, TextField, Tooltip} from "@mui/material";
import Button from "@mui/material/Button";
import {useAuth} from "../../providers/AuthProvider.tsx";
import ErrorPage from "../../components/ErrorPage.tsx";
import {CreateFormQuestion} from "./components/CreateFormQuestion.tsx";
import {CreatedModal} from "./components/CreatedModal.tsx";

const questionTypes = [
    {value: 'shortAnswer', label: 'Short Answer'},
    {value: 'longAnswer', label: 'Long Answer'},
    {value: 'rating5', label: 'Rating (1-5)'},
    {value: 'rating10', label: 'Rating (1-10)'},
];

export const CreatePage = () => {
    const {user} = useAuth();
    const [title, setTitle] = useState('');
    const [questions, setQuestions] = useState([]);
    const [questionText, setQuestionText] = useState('');
    const [questionType, setQuestionType] = useState(questionTypes[0].value);
    const [error, setError] = useState("");
    const [errorType, setErrorType] = useState("");
    const [openModal, setOpenModal] = useState(false);

    const handleAddQuestion = () => {
        const newQuestion = {text: questionText, type: questionType};
        setQuestions([...questions, newQuestion]);
        setQuestionText('');
        setQuestionType(questionTypes[0].value);
    }

    const handleDeleteQuestion = (index) => {
        setQuestions(questions.filter((_, i) => i !== index));
    };

    const handleQuestionTextChange = (index, newText) => {
        const updatedQuestions = questions.map((q, i) =>
            i === index ? {...q, text: newText} : q
        );
        setQuestions(updatedQuestions);
    };

    const handleCreateForm = async (email: string) => {
        if (!user || !user.email) {
            setError('User email is required');
            setErrorType('error')
            return;
        }

        const form = {
            email: user.email,
            title,
            questions: questions.map((q) => ({question: q.text, type: q.type})),
        }

        try {
            const res = await fetch('http://localhost:3000/form/create/', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            const result = await res.json();

            if (result.status === 'SUCCESS') {
                setError(result.message);
                setErrorType('success');
                setTitle('');
                setQuestions([]);
                setOpenModal(true);
            } else {
                setError(result.message);
                setErrorType('warning')
            }
        } catch (err) {
            console.error(err);
            setError(err.message);
            setErrorType('error')
        }
    }

    const handleCloseModal = () => {
        setOpenModal(false);
        window.location.reload(); // Refresh the page
    };

    return (
        <BaseLayout>
            <Container>
                <Box my={4}>
                    {error && <ErrorPage message={error} type={errorType}/>}
                    <Tooltip title="Enter the title for your form">
                        <TextField
                            fullWidth
                            label="Title of the form"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            margin="normal"
                        />
                    </Tooltip>
                    <Tooltip title="Enter the header for your question">
                        <TextField
                            fullWidth
                            label="Question Header"
                            value={questionText}
                            onChange={(e) => setQuestionText(e.target.value)}
                            margin="normal"
                        />
                    </Tooltip>
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
                        <Tooltip title="Click to add the question to your form">
                            <Button
                                sx={{
                                    height: {xs: '40px', sm: '54px'},
                                    mt: {xs: 1, sm: 1}
                                }}
                                fullWidth variant="contained" color="primary" onClick={handleAddQuestion}>
                                Add Question
                            </Button>
                        </Tooltip>
                    </Box>
                    {questions.map((question, index) => (
                        <CreateFormQuestion key={index} question={question} index={index}
                                            handleQuestionTextChange={handleQuestionTextChange}
                                            handleDeleteQuestion={handleDeleteQuestion}
                        />
                    ))}
                    <Tooltip title="Click to create your form">
                        <Button fullWidth variant="contained" color="primary" onClick={handleCreateForm} sx={{mt: 4}}>
                            Create Form
                        </Button>
                    </Tooltip>
                </Box>
                <CreatedModal handleCloseModal={handleCloseModal} openModal={openModal}/>
            </Container>
        </BaseLayout>
    )
}
