import {Box, Card, CardContent, Typography} from "@mui/material";


export const FormResponseItem = ({response, index}) => {

    return (
        <Card variant="outlined" sx={{my: 2}}>
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Card sx={{p: 2, width: '100%', backgroundColor: 'primary.main', color: 'white'}}>
                        <Typography variant="h6" component="h2">
                            {index + 1}: {response.question}
                        </Typography>
                    </Card>
                </Box>
                <Box mt={2}>
                    <Typography variant="h6" sx={{p: 1, color: 'primary.dark'}}>Response:</Typography>
                    <Typography sx={{p: 1}}>
                        {response.response}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    )
}