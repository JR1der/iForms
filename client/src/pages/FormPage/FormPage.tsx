import {BaseLayout} from "../../layout/BaseLayout.tsx";
import {Backdrop, Box, Card, Fade, Modal, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {useForm} from "../../hooks/useForm.ts";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Container from "@mui/material/Container";
import ErrorPage from "../../components/ErrorPage.tsx";
import {useAuth} from "../../providers/AuthProvider.tsx";
import {FormQuestion} from "./components/FormQuestion.tsx";
import {SubmittedModal} from "./components/SubmittedModal.tsx";
import CircularProgress from "@mui/material/CircularProgress";
import Tooltip from "@mui/material/Tooltip";

export const FormPage = () => {
    const {user} = useAuth();
    const {id} = useParams();
    const [forms, deleteForm, isLoading, isError] = useForm(id);
    const [error, setError] = useState("");
    const [errorType, setErrorType] = useState("");
    const [responseError, setResponseError] = useState("");
    const [responseErrorType, setResponseErrorType] = useState("");
    const [responses, setResponses] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [fadeIn, setFadeIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading) {
            setFadeIn(true);
        }
    }, [isLoading]);

    const handleEdit = () => {
        navigate(`/formEdit/${id}`)
    };

    const handleResponseChange = (response, index) => {
        const updatedResponses = [...responses];
        updatedResponses[index] = response;
        setResponses(updatedResponses);
    };

    const handleSubmit = async () => {
        const resBody = {
            formId: forms.data.formId,
            responses,
            createdAt: Date.now()
        }
        try {
            const res = await fetch(`http://localhost:3000/response/submitResponse/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(resBody),
            });

            const result = await res.json();

            if (result.status === 'SUCCESS') {
                setResponseError(result.message);
                setResponseErrorType('success');
                setOpenModal(true);
            } else {
                setResponseError(result.message);
                setResponseErrorType('warning')
            }
        } catch (err) {
            setResponseError(err.message);
            setResponseErrorType('error')
        }

    };

    const handleCloseModal = () => {
        setOpenModal(false);
        window.location.reload(); // Refresh the page
    };

    if (isLoading) {
        return (
            <BaseLayout>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '70vh',
                    }}
                >
                    <CircularProgress/>
                </Box>
            </BaseLayout>
        );
    }

    return (
        <BaseLayout>
            <Container>
                <Box my={4} sx={{
                    transition: 'opacity 0.5s, transform 0.5s',
                    opacity: fadeIn ? 1 : 0,
                    transform: fadeIn ? 'translateY(0)' : 'translateY(20px)'
                }}>
                    {isError ? (
                        <ErrorPage message={error} type={errorType}/>
                    ) : (
                        <Box>
                            <Box sx={{display: 'flex', flexDirection: 'row'}}>
                                {user?.email === forms.data?.createdBy && (
                                    <Tooltip title="Edit form">
                                        <Button fullWidth variant="outlined" onClick={handleEdit}
                                                sx={{mr: 1, fontWeight: 'bold'}}>
                                            click to edit the form
                                        </Button>
                                    </Tooltip>
                                )}
                                <Tooltip title="View form statistics">
                                    <Button fullWidth variant="outlined" sx={{ml: 1, fontWeight: 'bold'}}
                                            onClick={() => navigate(`/form/responses/${id}`)}>
                                        click to show form statistics
                                    </Button>
                                </Tooltip>
                            </Box>
                            {responseError && <ErrorPage message={responseError} type={responseErrorType}/>}
                            <Card sx={{p: 2, mt: 2, backgroundColor: 'primary.main', color: 'white'}}>
                                <Typography variant="h5" component="h1" sx={{fontWeight: 'bold', p: 1}}>
                                    {forms.data?.title}
                                </Typography>
                            </Card>
                            {user?.email === forms.data?.createdBy && (
                                <Tooltip title="Edit form">
                                    <Button fullWidth variant="outlined" onClick={handleEdit}
                                            sx={{mt: 2, fontWeight: 'bold'}}>
                                        click to edit the form
                                    </Button>
                                </Tooltip>
                            )}
                            {forms.data?.questions && forms.data.questions.map((question, index) => (
                                <FormQuestion key={index} question={question} index={index}
                                              handleResponseChange={handleResponseChange}/>
                            ))}
                            <Tooltip title="Submit form">
                                <Button fullWidth variant="contained" onClick={handleSubmit} sx={{mt: 2}}>
                                    click to submit your responses
                                </Button>
                            </Tooltip>
                        </Box>
                    )}
                </Box>
                <SubmittedModal handleCloseModal={handleCloseModal} openModal={openModal}/>
            </Container>
        </BaseLayout>
    );
};
