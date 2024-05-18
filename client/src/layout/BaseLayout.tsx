import {Box} from '@mui/material';
import {Header} from "./Header.tsx";
import {Page} from "./Page.tsx";
import {Footer} from "./Footer.tsx";

export const BaseLayout = ({children}: { children: React.ReactNode }) => {
    return (
        <Box sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
            <Header/>
            <Page>{children}</Page>
            <Footer/>
        </Box>
    )
}