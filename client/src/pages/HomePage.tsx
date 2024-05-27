import {BaseLayout} from "../layout/BaseLayout.tsx";
import {useAuth} from "../providers/AuthProvider.tsx";
import {Box, Typography, Card, CardContent, Container, Grid} from "@mui/material";
import createPageImg from "../../public/img/createPage.png";
import shareFormsImg from "../../public/img/shareForms.png";
import statisticsPic from "../../public/img/statisticsPic.png";
import sentimentAnalysis from "../../public/img/sentimentAnalysis.png";

export const HomePage = () => {
    const {user} = useAuth();

    return (
        <BaseLayout>
            <Container>
                <Box textAlign="center" my={5}>
                    <Typography variant="h3" component="h1" gutterBottom
                                sx={{fontWeight: 'bold', color: 'primary.main'}}>
                        Welcome, {user ? `${user.firstName} ${user.lastName}` : "Guest"}!
                    </Typography>
                    <Typography variant="h5" color="textSecondary" paragraph>
                        Discover <span style={{color: 'black'}}>IForms</span> - an awesome platform where you can
                        create, share, and analyze forms effortlessly.
                    </Typography>
                </Box>

                <Grid container direction="column" alignItems="center" spacing={4} my={5}>
                    <Grid item xs={12} md={10} style={{width: '95%'}}>
                        <Card>
                            <CardContent>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={12} md={6}>
                                        <Typography variant="h5" component="h2" gutterBottom
                                                    sx={{fontWeight: 'bold', color: 'primary.dark'}}>
                                            Create Forms
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Easily create customized forms to collect data and feedback from your
                                            audience.
                                            Our intuitive form builder allows you to add various types of questions,
                                            such as
                                            short answer, and rating scales, making it simple to gather the exact
                                            information you need.
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Whether you are conducting surveys, collecting customer feedback, or
                                            organizing events,
                                            our platform provides all the tools you need to create professional and
                                            engaging forms.
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <img src={createPageImg} alt="Create Forms"
                                             style={{width: '100%'}}/>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={10} style={{width: '95%'}}>
                        <Card>
                            <CardContent>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={12} md={6} order={{xs: 2, md: 1}}>
                                        <img src={shareFormsImg} alt="Share Forms"
                                             style={{width: '100%'}}/>
                                    </Grid>
                                    <Grid item xs={12} md={6} order={{xs: 1, md: 2}}>
                                        <Typography variant="h5" component="h2" gutterBottom
                                                    sx={{fontWeight: 'bold', color: 'primary.dark'}}>
                                            Share Forms
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Share your forms easily via links to reach a wider audience.
                                            Our platform provides direct links as sharing options
                                            ensuring your forms get the visibility they
                                            deserve.
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            You can also embed forms on your website or blog, making it convenient for
                                            users to respond
                                            without leaving your site. With our sharing tools, you can maximize your
                                            form’s reach and effectiveness.
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={10} style={{width: '95%'}}>
                        <Card>
                            <CardContent>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={12} md={6}>
                                        <Typography variant="h5" component="h2" gutterBottom
                                                    sx={{fontWeight: 'bold', color: 'primary.dark'}}>
                                            Get Detailed Statistics
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Analyze the responses with detailed statistics and insights to make informed
                                            decisions.
                                            Our platform provides real-time data analysis, including response rates,
                                            average scores,
                                            and detailed question-by-question breakdowns.
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            With customizable reports and visualizations, you can easily interpret the
                                            data and
                                            share insights with your team. Use our advanced filtering and
                                            cross-tabulation features
                                            to delve deeper into your data and uncover valuable trends and patterns.
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <img src={statisticsPic}
                                             alt="Get Detailed Statistics" style={{width: '100%'}}/>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={10} style={{width: '95%'}}>
                        <Card>
                            <CardContent>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={12} md={6} order={{xs: 2, md: 1}}>
                                        <img src={sentimentAnalysis} alt="Sentiment Analysis"
                                             style={{width: '100%'}}/>
                                    </Grid>
                                    <Grid item xs={12} md={6} order={{xs: 1, md: 2}}>
                                        <Typography variant="h5" component="h2" gutterBottom
                                                    sx={{fontWeight: 'bold', color: 'primary.dark'}}>
                                            Sentiment Analysis
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Utilize sentiment analysis to gauge the emotional tone of the responses.
                                            Our platform uses advanced natural language processing techniques to analyze
                                            open-ended responses
                                            and provide insights into the overall sentiment of your audience.
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Whether you want to measure customer satisfaction, employee engagement, or
                                            public opinion,
                                            our sentiment analysis tools can help you understand the underlying emotions
                                            and attitudes
                                            in the feedback you receive.
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </BaseLayout>
    );
};
