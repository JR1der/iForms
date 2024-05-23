import {Card, CardContent, Grid, Typography} from "@mui/material";
import Button from "@mui/material/Button";

export const ResponseItem = ({response, index, handleViewClick}) => {
    return (
        <Grid item xs={12} sm={6} key={index}>
            <Card>
                <CardContent>
                    <Typography variant="h6">
                        {response.question} Response: #{response._id.slice(-3)}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        {response.response}
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleViewClick(response.responseId)}
                        sx={{mt: 2}}
                    >
                        View
                    </Button>
                </CardContent>
            </Card>
        </Grid>
    )
}