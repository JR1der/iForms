import {BaseLayout} from "../layout/BaseLayout.tsx";
import {useAuth} from "../providers/AuthProvider.tsx";
import {Box, Typography, Button, Card, CardContent, Grid, Container} from "@mui/material";
import {Link} from "react-router-dom";

export const HomePage = () => {
    const {user} = useAuth();

    return (
        <BaseLayout>
            <Container>
                <Box textAlign="center" my={5}>
                    <Typography variant="h2" component="h1" gutterBottom>
                        Welcome, {user ? `${user.firstName} ${user.lastName}` : "Guest"}!
                    </Typography>
                    <Typography variant="h5" color="textSecondary" paragraph>
                        Discover our awesome platform.
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        component={Link}
                        to={user ? "/forms" : "/auth/login"}
                    >
                        {user ? "Go to Your Forms" : "Login to Get Started"}
                    </Button>
                </Box>

                {user && (
                    <Box textAlign="center" my={5}>
                        <Typography variant="h5" gutterBottom>
                            {`${user.firstName} ${user.lastName}`}
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                            {user.email}
                        </Typography>
                    </Box>
                )}

                <Grid container spacing={4} my={5}>
                    <Grid item xs={12} md={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" component="h2" gutterBottom>
                                    Create Forms
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Easily create customized forms to collect data and feedback from your audience.
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    component={Link}
                                    to="/feature-create"
                                    sx={{mt: 2}}
                                >
                                    Learn More
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" component="h2" gutterBottom>
                                    Share Forms
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Share your forms easily via links or social media to reach a wider audience.
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    component={Link}
                                    to="/feature-share"
                                    sx={{mt: 2}}
                                >
                                    Learn More
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" component="h2" gutterBottom>
                                    Get Detailed Statistics
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Analyze the responses with detailed statistics and insights to make informed decisions.
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    component={Link}
                                    to="/feature-statistics"
                                    sx={{mt: 2}}
                                >
                                    Learn More
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" component="h2" gutterBottom>
                                    Sentiment Analysis
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Utilize sentiment analysis to gauge the emotional tone of the responses.
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    component={Link}
                                    to="/feature-sentiment"
                                    sx={{mt: 2}}
                                >
                                    Learn More
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </BaseLayout>
    );
};
