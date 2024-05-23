import {Box, Card, CardContent, TextField, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {useState} from "react";

export const FormQuestion = ({question, index, handleResponseChange}) => {
    const [answer, setAnswer] = useState('');
    const [selectedRating, setSelectedRating] = useState(null);

    const handleInputChange = (e, questionType) => {
        const newAnswer = {
            question: question.question,
            questionId: question.questionId,
            response: e.target.value,
            type: questionType
        };

        setAnswer(e.target.value);
        handleResponseChange(newAnswer, index);
    };

    const handleButtonClick = (value, questionType) => {
        const newAnswer = {
            question: question.question,
            questionId: question.questionId,
            response: value.toString(),
            type: questionType
        };

        setSelectedRating(value === selectedRating ? null : value);
        handleResponseChange(newAnswer, index);
    };

    const characterLimit = question.type === 'shortAnswer' ? 50 : undefined;

    return (
        <Card variant="outlined" sx={{my: 2}}>
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" component="h2">
                        {question.question}
                    </Typography>
                </Box>
                <Box mt={2}>
                    {question.type === 'shortAnswer' &&
                        <TextField
                            fullWidth
                            label="Your answer..."
                            value={answer}
                            onChange={(e) => handleInputChange(e, question.type)}
                            inputProps={{maxLength: characterLimit}} // Set character limit
                        />}
                    {question.type === 'longAnswer' &&
                        <TextField fullWidth label="Your answer..." multiline rows={4} value={answer}
                                   onChange={(e) => handleInputChange(e, question.type)}/>}
                    {(question.type === 'rating5' || question.type === 'rating10') && (
                        <Box display="flex" flexWrap="wrap" gap={1}>
                            {[...Array(question.type === 'rating5' ? 5 : 10)].map((_, i) => (
                                <Button
                                    key={i}
                                    variant={selectedRating === i + 1 ? "contained" : "outlined"}
                                    onClick={() => handleButtonClick(i + 1, question.type)}
                                >
                                    {i + 1}
                                </Button>
                            ))}
                        </Box>
                    )}
                </Box>
                {question.type === 'shortAnswer' && (
                    <Typography variant="body2"
                                color={answer.length > characterLimit ? 'error' : 'text.secondary'}>
                        {answer.length}/{characterLimit}
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
};
