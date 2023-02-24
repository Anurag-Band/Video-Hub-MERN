import { Box, Container, CssBaseline } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { getVideos } from '../features/video/videoSlice';
import { clearErrors } from '../features/user/userSlice';
import { ErrorToast } from '../utils/CustomToast';
import VideoCard from '../components/VideoCard';

export default function Home() {
  const dispatch = useDispatch();
  const { allVideos, status, errorMessage } = useSelector(
    (state) => state.video
  );

  useEffect(() => {
    dispatch(getVideos());
  }, [dispatch]);

  useEffect(() => {
    if (errorMessage) {
      ErrorToast(errorMessage);
    }

    if (status === 'ERROR') {
      setTimeout(() => {
        dispatch(clearErrors());
      }, 3000);
    }
  }, [status, dispatch, errorMessage]);

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
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        {allVideos?.map((vid, index) => (
          <VideoCard key={index} vid={vid} />
        ))}
      </Box>
    </Container>
  );
}
