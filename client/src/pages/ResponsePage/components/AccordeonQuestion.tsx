    import {Accordion, AccordionDetails, AccordionSummary, Card, Typography} from "@mui/material";
    import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
    
    export const AccordeonQuestion = ({questionKey, questionValue}) => {
    
        return (
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography sx={{fontWeight: 'bold'}}>
                        Answers to "{questionKey}":
                    </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{backgroundColor: 'grey.100'}}>
                    {questionValue.responses && questionValue.responses.map((response, index) => (
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
                                    wordBreak: 'break-word',
                                    whiteSpace: 'normal'
                                }}>
                                {index + 1}. {response}
                            </Typography>
                        </Card>
                    ))}
                </AccordionDetails>
            </Accordion>
        )
    }
