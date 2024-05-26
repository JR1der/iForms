import {Box, Card, CardContent, IconButton, Select, TextField, Typography} from "@mui/material";
import {Delete} from "@mui/icons-material";
import Button from "@mui/material/Button";
import {useEffect, useState} from "react";
import MenuItem from "@mui/material/MenuItem";

export const EditFormQuestion = ({question, index, handleDeleteQuestion, updateQuestionText}) => {
    const [questionText, setQuestionText] = useState(question.question);

    useEffect(() => {
        setQuestionText(question.question || '');
    }, [question]);

    const handleQuestionTextChange = (e) => {
        setQuestionText(e.target.value);
        updateQuestionText(index, e.target.value);
    };

    return (
        <Card variant="outlined" sx={{my: 2}}>
            <CardContent>
                <Card sx={{mb: 1, p: 1, color: 'white', backgroundColor: 'primary.main'}}>
                    <Typography sx={{fontWeight: 'bold'}}>Question {index + 1}</Typography>
                    {(question.type === 'shortAnswerML' || question.type === 'longAnswerML') &&
                        <Typography>This question uses NLP sentiment analysis algorithms</Typography>}
                </Card>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <TextField
                        fullWidth
                        label="Question Header"
                        value={question.question}
                        onChange={handleQuestionTextChange}
                        margin="normal"
                    />
                    <Button sx={{ml: 2, height: '50px'}} onClick={() => handleDeleteQuestion(index)} variant="contained"
                            endIcon={<Delete/>}>
                        DELETE
                    </Button>
                </Box>
                <Box mt={2}>
                    {(question.type === 'shortAnswer' || question.type === 'shortAnswerML') &&
                        <TextField fullWidth label="Short Answer"/>}
                    {(question.type === 'longAnswer' || question.type === 'longAnswerML') &&
                        <TextField fullWidth label="Long Answer" multiline rows={4}/>}
                    {question.type === 'rating5' && (
                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                            <Card sx={{p: 2, backgroundColor: 'primary.main', color: 'white', mr: 2}}>
                                <Typography>Rate on a scale from 1 to 5:</Typography>
                            </Card>
                            <Select
                                value={5}
                                displayEmpty
                                sx={{width: '100px'}}
                            >
                                <MenuItem value="" disabled>
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
                    {question.type === 'rating10' && (
                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                            <Card sx={{p: 2, backgroundColor: 'primary.main', color: 'white', mr: 2}}>
                                <Typography>Rate on a scale from 1 to 5:</Typography>
                            </Card>
                            <Select
                                value={10}
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
            </CardContent>
        </Card>
    )
}