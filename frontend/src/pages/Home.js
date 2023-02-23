import { Box, Container, CssBaseline } from '@mui/material';
import React from 'react';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  return (
    <Container
      component='main'
      sx={{
        width: '100%',
        height: '100%',
      }}
    >
      <CssBaseline />
      <Box
        component='main'
        sx={{
          paddingTop: 8,
          paddingBottom: 8,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <h1>Home Page</h1>
      </Box>
    </Container>
  );
}
