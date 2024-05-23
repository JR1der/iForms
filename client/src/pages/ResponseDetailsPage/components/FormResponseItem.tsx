import {Box, Card, CardContent, Typography} from "@mui/material";


export const FormResponseItem = ({response, index}) => {

    return (
        <Card variant="outlined" sx={{my: 2}}>
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" component="h2">
                        {response.question}
                    </Typography>
                </Box>
                <Box mt={2}>
                    <Typography>
                        {response.response}
                    </Typography>
                    {/*{question.type === 'shortAnswer' &&*/}
                    {/*    <TextField fullWidth label="Your answer..." value={answer}*/}
                    {/*               onChange={(e) => handleInputChange(e, question.type)}/>}*/}
                    {/*{question.type === 'longAnswer' &&*/}
                    {/*    <TextField fullWidth label="Your answer..." multiline rows={4} value={answer}*/}
                    {/*               onChange={(e) => handleInputChange(e, question.type)}/>}*/}
                    {/*{(question.type === 'rating5' || question.type === 'rating10') && (*/}
                    {/*    <Box display="flex" flexWrap="wrap" gap={1}>*/}
                    {/*        {[...Array(question.type === 'rating5' ? 5 : 10)].map((_, i) => (*/}
                    {/*            <Button*/}
                    {/*                key={i}*/}
                    {/*                variant={selectedRating === i + 1 ? "contained" : "outlined"}*/}
                    {/*                onClick={() => handleButtonClick(i + 1, question.type)}*/}
                    {/*            >*/}
                    {/*                {i + 1}*/}
                    {/*            </Button>*/}
                    {/*        ))}*/}
                    {/*    </Box>*/}
                    {/*)}*/}
                </Box>
            </CardContent>
        </Card>
    )
}