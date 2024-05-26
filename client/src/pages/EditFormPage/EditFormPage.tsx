import { BaseLayout } from "../../layout/BaseLayout.tsx";
import { useEffect, useState } from "react";
import { useForm } from "../../hooks/useForm.ts";
import { useParams } from "react-router-dom";
import {
    Box, Card, Checkbox, Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    MenuItem,
    TextField,
    Typography
} from "@mui/material";
import ErrorPage from "../../components/ErrorPage.tsx";
import Button from "@mui/material/Button";
import { EditFormQuestion } from "./components/EditFormQuestion.tsx";
import Container from "@mui/material/Container";

const questionTypes = [
    { value: 'shortAnswer', label: 'Short Answer' },
    { value: 'longAnswer', label: 'Long Answer' },
    { value: 'rating5', label: 'Rating (1-5)' },
    { value: 'rating10', label: 'Rating (1-10)' },
];

export const EditFormPage = () => {
    const { id } = useParams();
    const [forms, deleteForm, isLoading, isError] = useForm(id);
    const [title, setTitle] = useState('');
    const [questions, setQuestions] = useState([]);
    const [questionText, setQuestionText] = useState('');
    const [questionType, setQuestionType] = useState(questionTypes[0].value);
    const [error, setError] = useState("");
    const [errorType, setErrorType] = useState("");
    const [fadeIn, setFadeIn] = useState(false);
    const [useNlp, setUseNlp] = useState(false);
    const [infoModalOpen, setInfoModalOpen] = useState(false);
    const [confirmModalOpen, setConfirmModalOpen] = useState(false); // State for confirmation modal

    useEffect(() => {
        if (!isLoading) {
            setFadeIn(true);
        }
    }, [isLoading]);

    useEffect(() => {
        if (forms.data) {
            setTitle(forms.data.title || "");
            setQuestions(forms.data.questions || []);
        }
    }, [forms]);

    const handleAddQuestion = () => {
        let modifiedQuestionType = questionType;
        if (questionType === 'shortAnswer' || questionType === 'longAnswer') {
            if (useNlp) {
                modifiedQuestionType = questionType === 'shortAnswer' ? 'shortAnswerML' : 'longAnswerML';
            }
        }

        const newQuestion = { question: questionText, type: questionType };
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

    const handleConfirmEdit = () => {
        setConfirmModalOpen(true); // Open the confirmation modal
    };

    const handleConfirmModalClose = () => {
        setConfirmModalOpen(false); // Close the confirmation modal
    };

    const handleConfirm = async () => {
        setConfirmModalOpen(false); // Close the confirmation modal before proceeding

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
    };

    if (isLoading) {
        return (
            <ErrorPage message="Loading..." type="info" />
        )
    }

    if (isError) {
        return <ErrorPage message="An error occurred while loading the form." type="error" />;
    }

    const handleInfoModalOpen = () => {
        setInfoModalOpen(true);
    };

    const handleInfoModalClose = () => {
        setInfoModalOpen(false);
    };

    return (
        <BaseLayout>
            <Container>
                <Box my={4} sx={{ transition: 'opacity 0.5s, transform 0.5s', opacity: fadeIn ? 1 : 0, transform: fadeIn ? 'translateY(0)' : 'translateY(20px)' }}>
                    {error && <ErrorPage message={error} type={errorType} />}
                    <TextField
                        fullWidth
                        label="Title of the form"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        margin="normal"
                    />
                    <Button fullWidth variant="contained" color="primary" onClick={handleConfirmEdit} sx={{ mt: 2 }}>
                        Confirm form edit
                    </Button>
                    <TextField
                        fullWidth
                        label="Question Header"
                        value={questionText}
                        onChange={(e) => setQuestionText(e.target.value)}
                        margin="normal"
                    />
                    <Card sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        p: 1,
                        backgroundColor: 'primary.main',
                        color: 'white',
                        mt: 2
                    }} my={2}>
                        <Checkbox
                            checked={useNlp}
                            onChange={(e) => setUseNlp(e.target.checked)}
                            inputProps={{ 'aria-label': 'Enable NLP analysis' }}
                            sx={{
                                color: 'white', '&.Mui-checked': {
                                    color: 'white',
                                },
                            }}
                        />
                        <Typography>Enable sentiment analysis</Typography>
                        <Button variant="outlined" sx={{
                            backgroundColor: 'white',
                            '&:hover': { backgroundColor: 'primary.light', color: 'white' },
                            ml: 3
                        }}
                                onClick={handleInfoModalOpen}>
                            What is this?
                        </Button>
                    </Card>
                    <Box display="flex" sx={{
                        flexDirection: { xs: 'column', sm: 'row' },
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
                            height: { xs: '40px', sm: '54px' }, // Same height as the TextField
                            mt: { xs: 1, sm: 1 }  // Adjust margin for smaller screens
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
                <Dialog
                    open={infoModalOpen}
                    onClose={handleInfoModalClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"What is Sentiment Analysis?"}</DialogTitle>
                    <DialogContent>

                        <DialogContentText id="alert-dialog-description">
                            Sentiment analysis is the process of using natural language processing (NLP) to determine
                            the emotional tone behind words.
                            It helps in identifying the sentiment expressed in a text, whether it's positive, negative,
                            or neutral. This can provide deeper insights into the responses given in the form.
                        </DialogContentText>
                        <Typography sx={{ fontWeight: 'bold', mt: 2 }}>
                            I strongly advise you to use it only when you are sure that your question can be answered
                            with positive, negative or neutral sentiment
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleInfoModalClose} color="primary" autoFocus>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Confirmation Modal */}
                <Dialog
                    open={confirmModalOpen}
                    onClose={handleConfirmModalClose}
                    aria-labelledby="confirm-dialog-title"
                    aria-describedby="confirm-dialog-description"
                >
                    <DialogTitle id="confirm-dialog-title">{"Confirm Form Edit"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="confirm-dialog-description">
                            Editing the form will delete all existing responses. Are you sure you want to proceed?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleConfirmModalClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleConfirm} color="primary" autoFocus>
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </BaseLayout>
    )
}
