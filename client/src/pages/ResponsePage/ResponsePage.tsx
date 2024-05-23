import {useNavigate, useParams} from "react-router-dom";
import {BaseLayout} from "../../layout/BaseLayout.tsx";
import {useResponses} from "../../hooks/useResponses.ts";
import {
    Box,
    Card,
    Grid,
    Typography,
    CircularProgress,
    Accordion,
    AccordionSummary,
    AccordionDetails
} from "@mui/material";
import Container from "@mui/material/Container";
import ErrorPage from "../../components/ErrorPage.tsx";
import {ResponseItem} from "./components/ResponseItem.tsx";
import {useQuestionsResponses} from "../../hooks/useQuestionsResponses.ts";
import {useState} from "react";

export const ResponsePage = () => {
    const {id} = useParams();
    const [responses, isLoading, isError] = useResponses(id);
    const [questionResponses, isQuestionResponsesLoading, isQuestionResponsesError] = useQuestionsResponses(id);
    const [expandedQuestion, setExpandedQuestion] = useState(null);
    const navigate = useNavigate();

    const handleViewClick = (responseId) => {
        navigate(`/form/responseDetails/${responseId}`);
    };

    console.log(questionResponses)
    return (
        <BaseLayout>
            <Container>
                <Box my={4}>
                    <Card sx={{p: 2, mb: 2}}>
                        <Typography variant="h6" component="div" textAlign="center" fontWeight="bold">
                            Questions and answers
                        </Typography>

                    </Card>
                    {isQuestionResponsesLoading && (
                        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                            <CircularProgress/>
                        </Box>
                    )}
                    {isQuestionResponsesError ? (
                        <ErrorPage message="An error occurred while loading the responses" type="error"/>
                    ) : (
                        <h1>{}</h1>
                    )}
                    <Card sx={{p: 2, mb: 2}}>
                        <Typography variant="h6" component="div" textAlign="center" fontWeight="bold">
                            Responses to your form
                        </Typography>
                    </Card>
                    {isLoading && (
                        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                            <CircularProgress/>
                        </Box>
                    )}
                    {isError ? (
                        <ErrorPage message="An error occurred while loading the responses" type="error"/>
                    ) : (
                        responses && (
                            <Grid container spacing={2}>
                                {responses.data && responses.data.map((response, index) => (
                                    <ResponseItem
                                        key={index}
                                        response={response}
                                        index={index}
                                        handleViewClick={handleViewClick}
                                    />
                                ))}
                            </Grid>
                        )
                    )}
                    {questionResponses && (
                        <Box mt={4}>
                            {/*<StatisticsChart data={questionResponses}/>*/}
                        </Box>
                    )}
                </Box>
            </Container>
        </BaseLayout>
    )
}
