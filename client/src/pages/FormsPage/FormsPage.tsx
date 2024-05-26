import {BaseLayout} from "../../layout/BaseLayout.tsx";
import {useAuth} from "../../providers/AuthProvider.tsx";
import Button from "@mui/material/Button";
import FormItem from "./components/FormItem.tsx";
import ErrorPage from "../../components/ErrorPage.tsx";
import {useForms} from "../../hooks/useForms.ts";
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {DeleteConfirmationModal} from "./components/DeleteConfirmationModal.tsx";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";

export const FormsPage = () => {
    const navigate = useNavigate();
    const {user} = useAuth();
    const [forms, deleteForm, isLoading, error] = useForms(user.email);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedFormId, setSelectedFormId] = useState('');
    const [fadeIn, setFadeIn] = useState(false);

    useEffect(() => {
        if (!isLoading) {
            setFadeIn(true);
        }
    }, [isLoading]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleDeleteForm = async (formId: string) => {
        await deleteForm(formId);
        setModalOpen(false);
    };

    const handleOpenModal = (formId: string) => {
        setSelectedFormId(formId);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <BaseLayout>
            <Box sx={{
                padding: 3,
                transition: 'opacity 0.5s, transform 0.5s',
                opacity: fadeIn ? 1 : 0,
                transform: fadeIn ? 'translateY(0)' : 'translateY(20px)'
            }}>
                <Tooltip title="Click to create a new form">
                    <Button
                        fullWidth
                        onClick={() => navigate('/forms/create')}
                        variant="contained"
                        color="primary"
                        size="large"
                        sx={{marginBottom: 3}}
                    >
                        Create Form
                    </Button>
                </Tooltip>
                {isLoading && (
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '70vh',
                    }}>
                        <CircularProgress/>
                    </Box>
                )}
                {!isLoading && error && (
                    <ErrorPage message="Error fetching forms. Please try again later." type="error"/>
                )}
                {!isLoading && !error && (!forms || !forms.data || forms.data.length === 0) && (
                    <ErrorPage message="No forms available. Create a new form to get started!" type="info"/>
                )}
                {!isLoading && !error && forms && forms.data && forms.data.length > 0 && (
                    <Box>
                        {forms.data.map((form: any, index) => (
                            <Box key={index} sx={{marginBottom: 2}}>
                                <FormItem
                                    form={form}
                                    handleDeleteForm={() => handleOpenModal(form.formId)}
                                    index={index}
                                />
                            </Box>

                        ))}
                    </Box>
                )}
            </Box>
            <DeleteConfirmationModal
                open={modalOpen}
                onClose={handleCloseModal}
                onDelete={() => handleDeleteForm(selectedFormId)}
            />
        </BaseLayout>
    );
};
