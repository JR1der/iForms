import {BaseLayout} from "../../layout/BaseLayout.tsx";
import {useEffect, useState} from "react";
import Container from "@mui/material/Container";
import {
    Box,
    Card,
    Checkbox,
    Dialog, DialogActions,
    DialogContent, DialogContentText,
    DialogTitle,
    MenuItem,
    TextField,
    Tooltip,
    Typography
} from "@mui/material";
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
    const [fadeIn, setFadeIn] = useState(false);
    const [useNlp, setUseNlp] = useState(false);
    const [infoModalOpen, setInfoModalOpen] = useState(false);

    useEffect(() => {
        setFadeIn(true);
    }, []);

    const handleAddQuestion = () => {
        let modifiedQuestionType = questionType;
        if (questionType === 'shortAnswer' || questionType === 'longAnswer') {
            if (useNlp) {
                modifiedQuestionType = questionType === 'shortAnswer' ? 'shortAnswerML' : 'longAnswerML';
            }
        }

        const newQuestion = {text: questionText, type: modifiedQuestionType};
        setQuestions([...questions, newQuestion]);
        setQuestionText('');
        setQuestionType(questionTypes[0].value);
        setUseNlp(false);
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
        window.location.reload();
    };

    const handleInfoModalOpen = () => {
        setInfoModalOpen(true);
    };

    const handleInfoModalClose = () => {
        setInfoModalOpen(false);
    };

    return (
        <BaseLayout>
            <Container>
                <Box my={4} sx={{
                    transition: 'opacity 0.5s, transform 0.5s',
                    opacity: fadeIn ? 1 : 0,
                    transform: fadeIn ? 'translateY(0)' : 'translateY(20px)'
                }}>
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
                    <Tooltip title="Enable NLP analysis for this question">
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
                                inputProps={{'aria-label': 'Enable NLP analysis'}}
                                sx={{
                                    color: 'white', '&.Mui-checked': {
                                        color: 'white',
                                    },
                                }}
                            />
                            <Typography>Enable sentiment analysis</Typography>
                            <Button variant="outlined" sx={{
                                backgroundColor: 'white',
                                '&:hover': {backgroundColor: 'primary.light', color: 'white'},
                                ml: 3
                            }}
                                    onClick={handleInfoModalOpen}>
                                What is this?
                            </Button>
                        </Card>
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
                        <Typography sx={{fontWeight: 'bold', mt: 2}}>
                            I strongly advise you to use it only when you are sure that you question can be answered
                            with positive, negative or neutral sentiment
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleInfoModalClose} color="primary" autoFocus>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </BaseLayout>
    )
}
