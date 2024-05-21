import {Box, Card, CardContent, IconButton, TextField} from "@mui/material";
import {Delete} from "@mui/icons-material";
import Button from "@mui/material/Button";

export const FormQuestion = ({question, index, handleQuestionTextChange, handleDeleteQuestion}) => {
    return (
        <Card variant="outlined" sx={{my: 2}}>
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <TextField
                        fullWidth
                        label="Question Header"
                        value={question.text}
                        onChange={(e) => handleQuestionTextChange(index, e.target.value)}
                        margin="normal"
                    />
                    <IconButton onClick={() => handleDeleteQuestion(index)}>
                        <Delete/>
                    </IconButton>
                </Box>
                <Box mt={2}>
                    {question.type === 'shortAnswer' && <TextField fullWidth label="Short Answer"/>}
                    {question.type === 'longAnswer' &&
                        <TextField fullWidth label="Long Answer" multiline rows={4}/>}
                    {question.type === 'rating5' && (
                        <Box display="flex" flexWrap="wrap" gap={1}>
                            {[...Array(5)].map((_, i) => (
                                <Button key={i} variant="outlined">
                                    {i + 1}
                                </Button>
                            ))}
                        </Box>
                    )}
                    {question.type === 'rating10' && (
                        <Box display="flex" flexWrap="wrap" gap={2}>
                            {[...Array(10)].map((_, i) => (
                                <Button key={i} variant="outlined">
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