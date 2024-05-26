import React from 'react';
import {Card, CardContent, Typography, Button, ButtonBase, Box} from "@mui/material";
import {useNavigate} from "react-router-dom";

interface FormItemProps {
    form: any;
    handleDeleteForm: (formId: string) => void;
    index: number;
}

const FormItem: React.FC<FormItemProps> = ({form, handleDeleteForm, index}) => {
    const navigate = useNavigate();

    const handleEnterForm = () => {
        navigate(`/form/${form.formId}`);
    };

    const handleButtonClick = (event: React.MouseEvent) => {
        event.stopPropagation();
    };

    return (
        <Card sx={{
            p: 2, cursor: 'pointer', '&:hover': {
                backgroundColor: 'grey.200',
            },
            transition: '0.3s'
        }} onClick={() => handleEnterForm()}>
            <CardContent
                sx={{
                    display: 'flex',
                    flexDirection: {xs: 'column', sm: 'row'},
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    textAlign: {xs: 'center', sm: 'left'},
                }}
            >
                <Box sx={{mb: {xs: 2, sm: 0}, flex: {xs: '1 1 auto', sm: '0 1 auto'}}}>
                    <Typography variant="h5" component="h2" sx={{fontWeight: 'bold', color: 'primary.dark'}}>
                        {form.title}
                    </Typography>
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: {xs: 'column', sm: 'row'},
                    gap: 1,
                    width: {xs: '100%', sm: 'auto'},
                    flexShrink: 0
                }}>
                    <Button
                        sx={{m: 1, minWidth: '120px'}}
                        variant="contained"
                        onClick={(event) => {
                            handleButtonClick(event);
                            handleEnterForm();
                        }}
                    >
                        Enter Form
                    </Button>
                    <Button
                        sx={{m: 1, minWidth: '120px'}}
                        variant="outlined"
                        onClick={(event) => {
                            handleButtonClick(event);
                            handleDeleteForm(form.formId);
                        }}
                    >
                        Delete Form
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
}

export default FormItem;
