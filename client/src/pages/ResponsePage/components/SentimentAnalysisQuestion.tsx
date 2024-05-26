import * as React from "react";
import {useTheme} from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {Accordion, AccordionDetails, AccordionSummary, Box, Card, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {PieChart} from "@mui/x-charts";

export const SentimentAnalysisQuestion = ({questionKey, questionValue}) => {
    const sentimentData = Object.entries(questionValue.sentimentStatistics).map(([label, count], index) => ({
        id: index,
        value: count,
        label: label,
    }));
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('xs'));
    const chartWidth = isXs ? 280 : 500;
    const chartHeight = isXs ? 100 : 250;

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
                    {expanded && (
                        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <Card sx={{
                                backgroundColor: 'primary.main',
                                color: 'white',
                                width: '90%',
                                p: 2,
                                mb: 2,
                                mt: 2
                            }}>
                                <Typography sx={{fontWeight: 'bold', textAlign: 'center'}}>
                                    Question Statistics Chart
                                </Typography>
                            </Card>
                            <Box sx={{width: '90%', display: 'flex', justifyContent: 'center'}}>
                                <PieChart
                                    series={[{
                                        data: sentimentData,
                                        cornerRadius: 5,
                                        highlightScope: {faded: 'global', highlighted: 'item'},
                                        faded: {innerRadius: 10, additionalRadius: -5, color: 'gray'},
                                    }]}
                                    width={chartWidth}
                                    height={chartHeight}
                                />
                            </Box>
                            <Card sx={{
                                backgroundColor: 'primary.main',
                                color: 'white',
                                width: '90%',
                                p: 2,
                                mb: 2,
                                mt: 2
                            }}>
                                <Typography sx={{fontWeight: 'bold', textAlign: 'center'}}>
                                    Question Statistics Chart
                                </Typography>
                            </Card>
                            <Box sx={{mt: 2, width: '93%'}}>

                                {questionValue.responses.map((response, index) => (
                                    <Card key={index}
                                          sx={{
                                              mt: 2,
                                              mb: 2,
                                              bt: 1,
                                              p: 2,
                                              backgroundColor: index % 2 ? 'primary.main' : 'white',
                                              color: index % 2 ? 'white' : 'black',
                                              overflow: 'visible'
                                          }}>
                                        <Typography
                                            sx={{
                                                fontWeight: 'bold',
                                                wordBreak: 'break-word',
                                                whiteSpace: 'normal'
                                            }}>
                                            Sentiment: {response.sentiment.label}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                wordBreak: 'break-word',
                                                whiteSpace: 'normal'
                                            }}>
                                            Response: {response.value}
                                        </Typography>
                                    </Card>
                                ))}
                            </Box>
                        </Box>
                    )}
                </Card>
            </AccordionDetails>
        </Accordion>
    )
}
