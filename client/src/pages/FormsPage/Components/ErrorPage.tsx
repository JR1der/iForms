import React from 'react';
import {Alert} from "@mui/material";

interface ErrorProps {
    message: string;
    type: string | undefined;
}

const ErrorPage: React.FC<ErrorProps> = ({message, type}) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
        }}>
            <Alert severity={type}>{message}</Alert>
        </div>
    );
}

export default ErrorPage;
