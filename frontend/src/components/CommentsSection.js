import { Box, IconButton, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVideoComments } from '../features/comment/commentSlice';
import Loader from '../assets/loading.svg';
import { Send } from '@mui/icons-material';
import axios from 'axios';
import { ErrorToast, SuccessToast } from '../utils/CustomToast';
import CommentCard from './CommentCard';

export default function CommentsSection({ videoId }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const { videoComments, status: commentStatus } = useSelector(
    (state) => state.comment
  );
  const [comment, setComment] = useState('');

  const handleComment = async () => {
    if (!user || !videoId) return;

    const formData = new FormData();
    formData.append('videoId', videoId);
    formData.append('commentContent', comment);

    try {
      const config = { headers: { 'Content-Type': 'application/json' } };
      const { data } = await axios.post(
        `/api/v1/video/comment`,
        formData,
        config
      );

      if (data?.success === true) {
        SuccessToast(data.message);
        setComment('');
      }
    } catch (error) {
      ErrorToast(error.response.data.message);
    }
  };

  useEffect(() => {
    if (!videoId) return;

    dispatch(getVideoComments(videoId));
  }, [dispatch, videoId]);

  if (commentStatus === 'LOADING') {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 20,
        }}
      >
        <img src={Loader} alt='Loading...' />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        padding: 2,
        gap: 3,
        pb: 5,
      }}
    >
      <Box>
        <Typography
          sx={{
            fontSize: 25,
            fontWeight: 600,
          }}
        >
          Comments
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 3,
          }}
        >
          <TextField
            required
            fullWidth
            id='comment'
            label='Comment'
            comment='comment'
            autoComplete='comment'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <IconButton
            type='submit'
            aria-label='comment'
            onClick={handleComment}
          >
            <Send fontSize={'10'} />
          </IconButton>
        </Box>
      </Box>
      <Box>
        {videoComments?.map((cmt, index) => (
          <CommentCard key={index} cmt={cmt} />
        ))}
      </Box>
    </Box>
  );
}
