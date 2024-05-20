import React from 'react';
import {Card, CardContent, Typography, Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

interface FormItemProps {
    form: any;
    handleDeleteForm: (formId: string) => void;
}

const FormItem: React.FC<FormItemProps> = ({form, handleDeleteForm}) => {
    const navigate = useNavigate();

    const handleEnterForm = () => {
        navigate(`/form/${form.formId}`);
    };
    return (
        <Card style={{margin: '10px', padding: '10px'}}>
            <CardContent>
                <div>
                    <Typography variant="h5" component="h2">
                        {form.title}
                    </Typography>
                </div>
            </CardContent>
            <Button onClick={() => handleDeleteForm(form.formId)}>Delete</Button>
            <Button onClick={handleEnterForm}>Enter Form</Button>
        </Card>
    );
}

export default FormItem;
