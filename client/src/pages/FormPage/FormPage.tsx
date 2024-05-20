import {BaseLayout} from "../../layout/BaseLayout.tsx";
import {Card, CardContent, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {useAuth} from "../../providers/AuthProvider.tsx";
import {useForm} from "../../hooks/useForm.ts";
import {useParams} from "react-router-dom";
import {useState} from "react";

export const FormPage = () => {
    const {user} = useAuth();
    const {formId} = useParams();
    const [] = useForm(user.email)

    return (
        <BaseLayout>
            <Card style={{margin: '10px', padding: '10px'}}>
                <CardContent>
                    <div>
                        <Typography variant="h5" component="h2">

                        </Typography>
                    </div>
                </CardContent>

            </Card>
        </BaseLayout>
    )
}