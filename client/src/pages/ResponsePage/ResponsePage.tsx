import {useNavigate, useParams} from "react-router-dom";
import {BaseLayout} from "../../layout/BaseLayout.tsx";
import {useResponses} from "../../hooks/useResponses.ts";
import {Box, Card, Grid, Typography, CircularProgress} from "@mui/material";
import Container from "@mui/material/Container";
import ErrorPage from "../../components/ErrorPage.tsx";
import {ResponseItem} from "./components/ResponseItem.tsx";
import {useQuestionsResponses} from "../../hooks/useQuestionsResponses.ts";
import {AccordeonQuestion} from "./components/AccordeonQuestion.tsx";
import {StatisticsQuestion} from "./components/StatisticsQuestion.tsx";
import {StatisticsOverview} from "./components/StatisticsOverview.tsx";
import {useForm} from "../../hooks/useForm.ts";
import {useState, useEffect} from 'react';
import {SentimentAnalysisQuestion} from "./components/SentimentAnalysisQuestion.tsx";

export const ResponsePage = () => {
    const {id} = useParams();
    const [responses, isLoading, isError] = useResponses(id);
    const [forms, deleteForm, isFormLoading, error] = useForm(id)
    const [questionResponses, isQuestionResponsesLoading, isQuestionResponsesError] = useQuestionsResponses(id);
    const navigate = useNavigate();
    const [fadeIn, setFadeIn] = useState(false);

    useEffect(() => {
        if (!isLoading && !isQuestionResponsesLoading) {
            setFadeIn(true);
        }
    }, [isLoading, isQuestionResponsesLoading]);

    const handleViewClick = (responseId) => {
        navigate(`/form/responseDetails/${responseId}`);
    };

    const calculateStatistics = () => {
        const totalResponses = responses?.data?.length;
        const totalQuestions = forms?.data?.questions.length;
        const formCreationDate = forms?.data?.createdAt;

        const formattedCreationDate = formCreationDate ? new Date(formCreationDate).toLocaleDateString() : '';

        return {totalResponses, totalQuestions, formCreationDate: formattedCreationDate};
    };

    const {totalResponses, totalQuestions, formCreationDate} = calculateStatistics();

    return (
        <BaseLayout>
            <Container>
                <Box my={4} style={{
                    transition: 'opacity 0.5s, transform 0.5s',
                    opacity: fadeIn ? 1 : 0,
                    transform: fadeIn ? 'translateY(0)' : 'translateY(20px)'
                }}>
                    <StatisticsOverview
                        totalResponses={totalResponses}
                        totalQuestions={totalQuestions}
                        formCreationDate={formCreationDate}
                    />
                    {isQuestionResponsesLoading && (
                        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                            <CircularProgress/>
                        </Box>
                    )}
                    {isQuestionResponsesError ? (
                        <ErrorPage message="An error occurred while loading the responses" type="error"/>
                    ) : (questionResponses && questionResponses.data &&
                        <>

                            <Box>
                                <Card sx={{p: 2, mb: 2, backgroundColor: 'primary.main', color: 'white'}}>
                                    <Typography variant="h6" component="div" textAlign="center" fontWeight="bold">
                                        Questions and answers
                                    </Typography>
                                </Card>
                                <Grid container spacing={2}>
                                    {questionResponses && questionResponses.data && Object.entries(questionResponses?.data).map(([questionKey, questionValue], index) => (
                                        <Grid item xs={12} key={questionKey}>
                                            {((questionValue.type === 'shortAnswerML' || questionValue.type === 'longAnswerML') &&
                                                <SentimentAnalysisQuestion
                                                    questionKey={questionKey}
                                                    questionValue={questionValue}
                                                />
                                            ) || (
                                                (questionValue.type === 'shortAnswer' || questionValue.type === 'longAnswer') ? (
                                                    <AccordeonQuestion
                                                        questionKey={questionKey}
                                                        questionValue={questionValue}
                                                    />
                                                ) : (
                                                    <StatisticsQuestion
                                                        questionKey={questionKey}
                                                        questionValue={questionValue}
                                                    />
                                                )
                                            )}
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        </>
                    )}
                    {isLoading && (
                        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                            <CircularProgress/>
                        </Box>
                    )}
                    {isError ? (
                        <ErrorPage message="An error occurred while loading the responses" type="error"/>
                    ) : (
                        responses && responses.data && (
                            <Box>
                                <Card sx={{p: 2, mb: 2, mt: 2, backgroundColor: 'primary.main', color: 'white'}}>
                                    <Typography variant="h6" component="div" textAlign="center" fontWeight="bold">
                                        Responses to your form
                                    </Typography>
                                </Card>
                                {responses.data.length === 0 && <ErrorPage
                                    message="Your form currently has no responses. Share it with other people!"
                                    type="info"/>}
                                <Grid container spacing={2}>
                                    {responses.data.map((response, index) => (
                                        <ResponseItem
                                            key={index}
                                            response={response}
                                            index={index}
                                            handleViewClick={handleViewClick}
                                        />
                                    ))}
                                </Grid>
                            </Box>
                        )
                    )}
                </Box>
            </Container>
        </BaseLayout>
    );
};
