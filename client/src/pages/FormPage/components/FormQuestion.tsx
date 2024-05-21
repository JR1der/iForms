import {Box, Card, CardContent, TextField, Typography} from "@mui/material";
import Button from "@mui/material/Button";


export const FormQuestion = ({question, index}) => {
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
                        <TextField fullWidth label="Your answer..."/>}
                    {question.type === 'longAnswer' &&
                        <TextField fullWidth label="Your answer..." multiline rows={4}/>}
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