import {Box, Card, CardContent, TextField, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {useState} from "react";


export const FormQuestion = ({question, index,handleAnswerChange}) => {
    const [answer, setAnswer] = useState('');

    const handleInputChange = (event) => {
        setAnswer(event.target.value);
        handleAnswerChange(index,event.target.value);
    };

    const handleButtonClick = (value) => {
        setAnswer(value.toString());
        handleAnswerChange(index,value);
    };

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
                        <TextField fullWidth label="Your answer..." value={answer}
                                   onChange={handleInputChange}/>}
                    {question.type === 'longAnswer' &&
                        <TextField fullWidth label="Your answer..." multiline rows={4} value={answer}
                                   onChange={handleInputChange}/>}
                    {question.type === 'rating5' && (
                        <Box display="flex" flexWrap="wrap" gap={1}>
                            {[...Array(5)].map((_, i) => (
                                <Button key={i} variant="outlined" onClick={() => handleButtonClick(i + 1)}>
                                    {i + 1}
                                </Button>
                            ))}
                        </Box>
                    )}
                    {question.type === 'rating10' && (
                        <Box display="flex" flexWrap="wrap" gap={2}>
                            {[...Array(10)].map((_, i) => (
                                <Button key={i} variant="outlined" onClick={() => handleButtonClick(i + 1)}>
                                    {i + 1}
                                </Button>
                            ))}
                        </Box>
                    )}
                </Box>
            </CardContent>
        </Card>
    )
}