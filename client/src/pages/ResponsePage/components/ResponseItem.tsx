import {Box, Card, CardContent, Grid, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import React from "react";

export const ResponseItem = ({response, index, handleViewClick}) => {
    const handleButtonClick = (event: React.MouseEvent) => {
        event.stopPropagation();
    };

    return (
        <Grid item xs={12} sm={6} key={index}>
            <Card
                sx={{
                    '&:hover': {
                        backgroundColor: 'grey.200',
                    },
                    transition: '0.3s',
                    cursor: 'pointer'
                }}
                onClick={() => handleViewClick(response.responseId)}
            >
                <CardContent
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        height: '100%',
                    }}
                >
                    <div style={{flex: 1}}>
                        <Typography variant="h6">
                            {response.question} Response number: {index + 1}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" sx={{mt: 1}}>
                            {response.response}
                        </Typography>
                    </div>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={(event) => {
                            handleButtonClick(event);
                            handleViewClick(response.responseId);
                        }}
                        sx={{m: 1, minWidth: '120px'}}
                    >
                        View
                    </Button>
                </CardContent>
            </Card>
        </Grid>
    )
}