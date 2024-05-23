import {useState} from 'react';
import {Modal, Box, Button, Typography, TextField, Fade} from '@mui/material';
import {useAuth} from "../../../providers/AuthProvider.tsx";

export const DeleteConfirmationModal = ({open, onClose, onDelete}) => {
    const {user} = useAuth();
    const [email, setEmail] = useState('');
    const [isDeleteDisabled, setIsDeleteDisabled] = useState(true);

    const handleEmailChange = (e) => {
        const inputEmail = e.target.value;
        setEmail(inputEmail);
        setIsDeleteDisabled(inputEmail !== user?.email);
    };

    const handleDelete = () => {
        if (email === user?.email) {
            onDelete();
            setEmail('');
        }
    };

    return (
        <Modal
            open={open}
            onClose={() => {
                onClose();
                setEmail('')
            }}
            aria-labelledby="delete-confirmation-modal"
            aria-describedby="delete-confirmation-modal-description"
        >
            <Fade in={open}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: { xs: '80%', sm: 400 },
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                        <Typography
                            variant="h4"
                            component="h2"
                            textAlign="center"
                            sx={{ flexGrow: 1 }}
                        >
                            Are you sure?
                        </Typography>
                        <Typography
                            variant="h6"
                            component="div"
                            color="error"
                            onClick={() => {
                                onClose();
                                setEmail('');
                            }}
                            sx={{
                                position: 'absolute',
                                top: '-25px',
                                right: '-10px',
                                fontSize: '2rem',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                            }}
                        >
                            ×
                        </Typography>
                    </Box>
                    <Typography id="delete-confirmation-modal-description" textAlign="center" sx={{ mt: 2 }}>
                        This form and its answers will be permanently deleted.
                    </Typography>
                    <Typography textAlign="center" variant="h6" color="error" sx={{ fontWeight: 'bold' }}>
                        These actions cannot be undone.
                    </Typography>
                    <Typography textAlign="center">
                        Type your email for confirmation of deletion.
                    </Typography>
                    <TextField
                        fullWidth
                        label="Your email..."
                        value={email}
                        onChange={handleEmailChange}
                        margin="normal"
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="error"
                        onClick={handleDelete}
                        disabled={isDeleteDisabled}
                        sx={{ mt: 2 }}
                    >
                        Delete
                    </Button>
                </Box>
            </Fade>
        </Modal>
    );
};