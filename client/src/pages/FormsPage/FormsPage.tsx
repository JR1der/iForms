import {BaseLayout} from "../../layout/BaseLayout.tsx";
import {useAuth} from "../../providers/AuthProvider.tsx";
import Button from "@mui/material/Button";
import FormItem from "./components/FormItem.tsx";
import ErrorPage from "../../components/ErrorPage.tsx";
import {useForms} from "../../hooks/useForms.ts";
import {useState} from "react";
import {useNavigate} from "react-router-dom";


export const FormsPage = () => {
    const navigate = useNavigate();
    const {user} = useAuth();
    const [forms, deleteForm, isLoading, error] = useForms(user.email);
    const [isAlertVisible] = useState(false);

    const handleDeleteForm = async (formId: string) => {
        await deleteForm(formId);
    };

    return (
        <BaseLayout>
            <div>
                <Button
                    fullWidth
                    onClick={() => navigate('/forms/create')}
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{marginBottom: '20px'}}
                >
                    Create Form
                </Button>
                {(isLoading || isAlertVisible) && <ErrorPage message="Loading..." type="info"/>}
                {!isLoading && !isAlertVisible && error && <ErrorPage message="Error fetching forms" type="error"/>}
                {!isLoading && !error && (!forms || !forms.data || forms.data.length === 0) && (
                    <ErrorPage message="No forms available" type="info"/>
                )}
                {!isLoading && !error && forms && forms.data && forms.data.length > 0 && (
                    forms.data.map((form: any) => (
                        <div key={form.formId}>
                            <FormItem
                                form={form}
                                handleDeleteForm={handleDeleteForm}
                            />
                        </div>
                    ))
                )}
            </div>
        </BaseLayout>
    )
}
