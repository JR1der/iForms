import {Box, Container, Grid, Typography} from '@mui/material';

export const Footer = () => {
    return (
        <Box
            sx={{
                width: "100%",
                height: "auto",
                backgroundColor: 'primary.main',
                paddingTop: "1rem",
                paddingBottom: "1rem",
            }}
        >
            <Container maxWidth="lg">
                <Grid container direction="column" alignItems="center">
                    <Grid item xs={12}>
                        <Typography color="white" variant="subtitle1">
                            Built with MERN by Ivan Popovych
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography color="info.dark" variant="subtitle1">
                            &copy; {new Date().getFullYear()} iForms. All rights reserved.
                        </Typography>
                    </Grid>

                </Grid>
            </Container>
        </Box>
    );
};
