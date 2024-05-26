import * as React from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Card,
    Typography,
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {BarChart} from '@mui/x-charts/BarChart';
import {PieChart} from "@mui/x-charts";

export const StatisticsQuestion = ({questionKey, questionValue}) => {
    const maxYValue = questionValue.type === 'rating5' ? 5 : 10;

    const responseCounts = questionValue.responses.reduce((acc, response) => {
        acc[response] = (acc[response] || 0) + 1;
        return acc;
    }, {});

    const pieChartData = Object.keys(responseCounts).map((key, index) => ({
        id: index,
        value: responseCounts[key],
        label: key,
    }));

    const [expanded, setExpanded] = React.useState(false);

    const handleAccordionChange = (event, isExpanded) => {
        setExpanded(isExpanded);
    };

    return (
        <Accordion expanded={expanded} onChange={handleAccordionChange}>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                <Typography sx={{fontWeight: 'bold'}}>
                    Answers to "{questionKey}":
                </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{backgroundColor: 'grey.100'}}>
                <Card sx={{
                    mt: 2,
                    mb: 2,
                    bt: 1,
                    p: 2,
                }}>
                    <Typography sx={{fontWeight: 'bold', textAlign: 'center'}}>
                        Question statistics
                    </Typography>
                    {expanded && (
                        <Card sx={{
                            display: 'flex',
                            flexDirection: {sm: 'row', xs: 'column'},
                            alignItems: 'center',
                            justifyContent: 'space-around',
                            mt: 2,
                            mb: 2,
                            bt: 1,
                        }}>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '50%',
                                height: '100%',
                                p: 2,
                            }}>
                                <Typography sx={{mb: 2}}>Average mark</Typography>
                                <BarChart
                                    series={[
                                        {data: [questionValue.average]}
                                    ]}
                                    height={150}
                                    width={200}
                                    yAxis={[{max: maxYValue}]}
                                    xAxis={[{data: [questionKey], scaleType: 'band'}]}
                                    margin={{top: 20, bottom: 30, left: 50, right: 50}}
                                />
                            </Box>
                            <Card sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: {sm:'50%',xs:'100%'},
                                height: '100%',
                                p: 2,
                            }}>
                                <Typography sx={{mb: 2}}>All results</Typography>
                                <PieChart
                                    series={[
                                        {
                                            data: pieChartData,
                                            cornerRadius: 5,
                                            highlightScope: {faded: 'global', highlighted: 'item'},
                                            faded: {innerRadius: 10, additionalRadius: -5, color: 'gray'},
                                        },
                                    ]}
                                    width={300}
                                    height={150}
                                />
                            </Card>
                        </Card>
                    )}
                </Card>
            </AccordionDetails>
        </Accordion>
    );
};
