import { Alert, AlertColor, Box, Button, Container, CssBaseline, Grid, Snackbar, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import { EMAIL_VALIDATION_REGEX, PASSWORD_VALIDATION_REGEX, VALIDATIONS } from "../utils/constants";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [open, setOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<AlertColor>();
    const [nameError, setNameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [emailError, setEmailError] = useState("");
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            const postData = { name, email, password };
            if (handleValidations()) { return false; }
            const response = await axios.post('/auth/signup', postData);
            if (response && response.status === 201) {
                const message = response?.data?.message || 'Success'
                handleAlert(message, 'success');
                navigate('/login')
            }
        } catch (err: any) {
            const message = err.response?.data?.message || 'Error'
            handleAlert(message, 'error');
        }
    };

    const handleValidations = () => {
        let isError = false;
        if (!name) { isError = true; setNameError(VALIDATIONS.NAME.REQUIRED) }
        else { setNameError('') }
        if (!email) { isError = true; setEmailError(VALIDATIONS.EMAIL.REQUIRED) }
        else { setEmailError('') }
        if (!password) { isError = true; setPasswordError(VALIDATIONS.PASSWORD.REQUIRED) }
        else { setPasswordError('') }

        if (email && !EMAIL_VALIDATION_REGEX.test(email)) { isError = true; setEmailError(VALIDATIONS.EMAIL.IS_NOT_VALID_EMAIL) }
        else if (email) { setEmailError(''); }

        if (password) {
            if (password.length < 8) { isError = true; setPasswordError(VALIDATIONS.PASSWORD.MIN_LENGTH); }
            else if (password.length >= 8) {
                if (password && !PASSWORD_VALIDATION_REGEX.test(password)) { 
                    isError = true; setPasswordError(VALIDATIONS.PASSWORD.INPUT_VALIDATION)
                }
            }
        }

        return isError;
    }

    const handleAlert = (message: string, type: AlertColor, isOpen = true) => {
        setToastMessage(message);
        setToastType(type);
        setOpen(isOpen);
    }
    
    useEffect(() => {
        const isLoggedInUser = localStorage.getItem('token');
        if (isLoggedInUser) { navigate('/'); }
    });

    const handleClose = () => { setOpen(false); };
    return (
    <>
        <Container maxWidth="xs">
            <CssBaseline />
            <Box
            sx={{
                mt: 20,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
            >
                <Typography variant="h5">Register</Typography>
                <Box sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                            error={nameError && nameError.length ? true : false}
                            name="name"
                            required
                            fullWidth
                            id="name"
                            label="Name"
                            autoFocus
                            value={name}
                            helperText={nameError}
                            onChange={(e) => setName(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                            error={emailError && emailError.length ? true : false}
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            value={email}
                            helperText={emailError}
                            onChange={(e) => setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                            error={passwordError && passwordError.length ? true : false}
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            value={password}
                            helperText={passwordError}
                            onChange={(e) => setPassword(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleRegister}
                    >Register</Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link to="/login">Already have an account? Login</Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert onClose={handleClose} severity={toastType} sx={{ width: '100%' }}>
                {toastMessage}
                </Alert>
            </Snackbar>
        </Container>
    </>
    )
};

export default Register;