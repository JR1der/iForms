import {Box, Card, Typography} from "@mui/material";
import {BaseLayout} from "../../layout/BaseLayout.tsx";
import {useParams} from "react-router-dom";
import {useResponse} from "../../hooks/useResponse.ts";
import ErrorPage from "../../components/ErrorPage.tsx";
import {FormResponseItem} from "./components/FormResponseItem.tsx";
import CircularProgress from "@mui/material/CircularProgress";
import { Key } from "react";

export const ResponseDetailsPage = () => {
    const {id} = useParams();
    const [response, isLoading, isError] = useResponse(id);

    return (
        <BaseLayout>
            <Card sx={{p: 2, mb: 2}}>
                <Typography variant="h6" component="div" textAlign="center">
                    Response: {id}
                </Typography>
            </Card>
            {isLoading && (
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '50vh',
                }}>
                    <CircularProgress/>
                </Box>
            )}
            {isError ? (
                <ErrorPage message="An error occured while providing the response details!" type="error"/>
            ) : (
                <Box>
                    {response.data?.responses && response.data.responses.map((response: never, index: Key | null | undefined) => (
                        <FormResponseItem key={index} response={response} index={index}/>
                    ))}
                </Box>
            )}
        </BaseLayout>
    )
}