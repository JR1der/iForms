import { Card, Box, Typography } from "@mui/material";
import CountUp from 'react-countup';

export const StatisticsOverview = ({ totalResponses, totalQuestions, formCreationDate }) => {
    return (
        <>
            <Card sx={{ p: 2, mb: 2, backgroundColor: 'primary.main', color: 'white' }}>
                <Typography variant="h6" component="div" textAlign="center" fontWeight="bold">
                    Overall statistics
                </Typography>
            </Card>
            <Card sx={{ p: 2, mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-around', flexDirection: { xs: 'column', md: 'row' } }}>
                    <Box textAlign="center" sx={{ mb: { xs: 2, md: 0 } }}>
                        <Typography variant="h6" component="div" fontWeight="bold">
                            Total Responses
                        </Typography>
                        <Typography variant="h4" component="div">
                            <CountUp end={totalResponses} duration={3} />
                        </Typography>
                    </Box>
                    <Box textAlign="center" sx={{ mb: { xs: 2, md: 0 } }}>
                        <Typography variant="h6" component="div" fontWeight="bold">
                            Total Questions
                        </Typography>
                        <Typography variant="h4" component="div">
                            <CountUp end={totalQuestions} duration={3} />
                        </Typography>
                    </Box>
                    <Box textAlign="center">
                        <Typography variant="h6" component="div" fontWeight="bold">
                            Form Created On
                        </Typography>
                        <Typography variant="h4" component="div">
                            {formCreationDate}
                        </Typography>
                    </Box>
                </Box>
            </Card>
        </>
    );
};
