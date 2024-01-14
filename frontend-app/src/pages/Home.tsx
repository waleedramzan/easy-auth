import { Box, Button, Container, CssBaseline, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.clear();
    navigate('/login')
  }
  return (
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
            <Typography variant="h5">User is logged in</Typography>
            <Box sx={{ mt: 3 }}>
                <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleLogout}
                >Logout</Button>
            </Box>
        </Box>
    </Container>

  );
}

export default Home;
