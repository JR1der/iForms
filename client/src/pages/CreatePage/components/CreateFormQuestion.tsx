import {Box, Card, CardContent, IconButton, Select, TextField, Typography} from "@mui/material";
import {Delete} from "@mui/icons-material";
import Button from "@mui/material/Button";
import {useState} from "react";
import MenuItem from "@mui/material/MenuItem";

export const CreateFormQuestion = ({question, index, handleQuestionTextChange, handleDeleteQuestion}) => {
    const characterLimit = (question.type === 'shortAnswerML' || question.type === 'shortAnswer') ? 50 : undefined;
    const [responseText, setResponseText] = useState(''); // Correct syntax for useState

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
                        value={question.text}
                        onChange={(e) => handleQuestionTextChange(index, e.target.value)}
                        margin="normal"
                    />
                    <Button sx={{ml: 2, height: '50px'}} onClick={() => handleDeleteQuestion(index)} variant="contained"
                            endIcon={<Delete/>}>
                        DELETE
                    </Button>
                </Box>
                <Box mt={2}>
                    {(question.type === 'shortAnswer' || question.type === 'shortAnswerML') && (
                        <TextField
                            fullWidth
                            label="Short Answer"
                            value={responseText}
                            inputProps={{maxLength: characterLimit}}
                            onChange={(e) => setResponseText(e.target.value)}
                        />
                    )}
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
                                <Typography>Rate on a scale from 1 to 10:</Typography>
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
                {(question.type === 'shortAnswer' || question.type === 'shortAnswerML') && (
                    <Typography variant="body2"
                                color={responseText.length > characterLimit ? 'error' : 'text.secondary'}>
                        {responseText.length}/{characterLimit}
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
};
