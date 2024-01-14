import { Container, CssBaseline, Box, Typography, TextField, Button, Grid, AlertColor, Snackbar, Alert } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import { EMAIL_VALIDATION_REGEX, VALIDATIONS } from "../utils/constants";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [open, setOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<AlertColor>();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const postData = { email, password };
    try {
      if (handleValidations()) { return false; }
      const response = await axios.post('/auth/login', postData);
      if (response && response.status === 200) {
        const message = response?.data?.message || 'Success'
        handleAlert(message, 'success');
        localStorage.setItem('token', response?.data?.token);
        navigate('/')
      }
    } catch (err: any) {
      const message = err.response?.data?.message || 'Error'
      handleAlert(message, 'error');
    }
  };

  const handleValidations = () => {
    let isError = false;
    if (!email) { isError = true; setEmailError(VALIDATIONS.EMAIL.REQUIRED); }
    else { setEmailError(''); }
    if (!password) { isError = true; setPasswordError(VALIDATIONS.PASSWORD.REQUIRED); }
    else { setPasswordError(''); }

    if (email && !EMAIL_VALIDATION_REGEX.test(email)) { isError = true; setEmailError(VALIDATIONS.EMAIL.IS_NOT_VALID_EMAIL); }
    return isError;
  }

  useEffect(() => {
    const isLoggedInUser = localStorage.getItem('token');
    if (isLoggedInUser) { navigate('/'); }
  });

  const handleAlert = (message: string, type: AlertColor = 'success', isOpen = true) => {
    setToastMessage(message);
    setToastType(type);
    setOpen(isOpen);
  }

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
          <Typography variant="h5">Login</Typography>
          <Box sx={{ mt: 1 }}>
            <TextField
              error={emailError && emailError.length ? true : false}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoFocus
              value={email}
              helperText={emailError}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              error={passwordError && passwordError.length ? true : false}
              margin="normal"
              required
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              value={password}
              helperText={passwordError}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleLogin}
            >
              Login
            </Button>
            <Grid container justifyContent={"flex-end"}>
              <Grid item>
                <Link to="/register">Don't have an account? Register</Link>
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
  );
};

export default Login;