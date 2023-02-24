import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Loader from '../../assets/upload-loading.svg';
import axios from 'axios';
import { ErrorToast, SuccessToast } from '../../utils/CustomToast';
import { UploadFileOutlined } from '@mui/icons-material';

export default function UploadNewVideo() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [video, setVideo] = useState('');
  const [videoThumbnail, setVideoThumbnail] = useState(undefined);

  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setLoading(false);
    setTitle('');
    setDescription('');
    setVideo('');
    setVideoThumbnail(undefined);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('video', video);
    formData.append('videoThumbnail', videoThumbnail);

    setLoading(true);

    try {
      const config = {
        headers: {
          Accept: 'multipart/form-data',
          'Content-Type': 'multipart/form-data',
        },
      };
      const { data } = await axios.post(
        '/api/v1/video/upload',
        formData,
        config
      );

      if (data?.success === true) {
        resetForm();
        SuccessToast('Video Created Successfully!');
      }

      return data;
    } catch (error) {
      if (error) {
        setLoading(false);
        ErrorToast(
          error?.response?.data?.message || 'Error Occured in Video Upload!'
        );
      }
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <UploadFileOutlined />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Upload New Video
        </Typography>
        <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id='title'
                label='Video Title'
                name='title'
                autoComplete='title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                multiline
                name='description'
                label='Video Description'
                type='description'
                id='description'
                autoComplete='description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id='video'
                label='Video Link'
                name='video'
                autoComplete='video'
                value={video}
                onChange={(e) => setVideo(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                type='file'
                name='videoThumbnail'
                accept='image/*'
                hidden
                onChange={(e) => setVideoThumbnail(e.target.files[0])}
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='outlined'
            sx={{ mt: 3, fontSize: 20 }}
            disabled={loading}
          >
            {loading ? (
              <img
                src={Loader}
                alt='Loading...'
                style={{
                  width: '40px',
                  margin: '0 auto',
                }}
              />
            ) : (
              'Upload'
            )}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
