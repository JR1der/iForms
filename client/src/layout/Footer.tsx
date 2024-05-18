import {Box, Container, Typography} from '@mui/material';

export const Footer = () => {
    return (
        <Box component="footer" sx={{py: 3, px: 2, mt: 'auto', backgroundColor: 'grey.200'}}>
            <Container maxWidth="sm">
                <Typography variant="body1">My footer content.</Typography>
            </Container>
        </Box>
    );
};
