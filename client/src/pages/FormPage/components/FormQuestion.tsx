import {Box, Card, CardContent, Select, TextField, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {useState} from "react";
import MenuItem from "@mui/material/MenuItem";

export const FormQuestion = ({question, index, handleResponseChange}) => {
    const [answer, setAnswer] = useState('');
    const [selectedRating, setSelectedRating] = useState(0);

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

    const handleRatingChange = (e) => {
        const value = e.target.value;
        const newAnswer = {
            question: question.question,
            questionId: question.questionId,
            response: value,
            type: question.type
        };

        setSelectedRating(value);
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

    const characterLimit = (question.type === 'shortAnswer' || question.type === 'shortAnswerML') ? 50 : undefined;

    return (
        <Card variant="outlined" sx={{my: 2}}>
            <CardContent>
                <Card sx={{mb: 1, p: 1, color: 'white', backgroundColor: 'primary.main'}}>
                    <Typography sx={{fontWeight: 'bold'}}>Question {index + 1}:</Typography>
                </Card>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" component="h2">
                        {question.question}
                    </Typography>
                </Box>
                <Box mt={2}>
                    {(question.type === 'shortAnswer' || question.type === 'shortAnswerML') &&
                        <TextField
                            fullWidth
                            label="Your answer..."
                            value={answer}
                            onChange={(e) => handleInputChange(e, question.type)}
                            inputProps={{maxLength: characterLimit}} // Set character limit
                        />}
                    {(question.type === 'longAnswer' || question.type === 'longAnswerML') &&
                        <TextField fullWidth label="Your answer..." multiline rows={4} value={answer}
                                   onChange={(e) => handleInputChange(e, question.type)}/>}
                    {(question.type === 'rating5') && (
                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                            <Card sx={{p: 2, backgroundColor: 'primary.main', color: 'white', mr: 2}}>
                                <Typography>Rate on a scale from 1 to 5:</Typography>
                            </Card>
                            <Select
                                value={selectedRating}
                                onChange={handleRatingChange}
                                displayEmpty
                                sx={{width: '100px'}}
                            >
                                <MenuItem value="1" disabled>
                                    Select
                                </MenuItem>
                                {[1, 2, 3, 4, 5].map((value) => (
                                    <MenuItem key={value} value={value}>
                                        {value}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Box>
                    )}
                    {(question.type === 'rating10') && (
                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                            <Card sx={{p: 2, backgroundColor: 'primary.main', color: 'white', mr: 2}}>
                                <Typography>Rate on a scale from 1 to 10:</Typography>
                            </Card>
                            <Select
                                value={selectedRating}
                                onChange={handleRatingChange}
                                displayEmpty
                                sx={{width: '100px'}}
                            >
                                <MenuItem value="" disabled>
                                    Select
                                </MenuItem>
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                                    <MenuItem key={value} value={value}>
                                        {value}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Box>
                    )}
                </Box>
                {(question.type === 'shortAnswer' || question.type === 'shortAnswerML') && (
                    <Typography variant="body2"
                                color={answer.length > characterLimit ? 'error' : 'text.secondary'}>
                        {answer.length}/{characterLimit}
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
};
