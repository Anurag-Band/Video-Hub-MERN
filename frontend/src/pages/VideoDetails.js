import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ErrorToast, SuccessToast } from '../utils/CustomToast';
import {
  Box,
  Card,
  CardActions,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import { Favorite, ShareOutlined } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getVideoDetails } from '../features/video/videoSlice';
import Loader from '../assets/loading.svg';
import Moment from 'react-moment';
import ReactPlayer from 'react-player';
import CommentsSection from '../components/CommentsSection';

export default function VideoDetails() {
  const dispatch = useDispatch();
  const { videoId } = useParams();
  const user = useSelector((state) => state.user.user);
  const { status, videoDetails } = useSelector((state) => state.video);

  const [hasLiked, setHasLiked] = useState(false);

  const handleUserLike = async () => {
    try {
      const { data } = await axios.put(
        `/api/v1/video/like/${videoDetails?._id}`
      );

      if (data.isLiked) {
        setHasLiked(true);
        SuccessToast(data.message);
      } else {
        setHasLiked(false);
        SuccessToast(data.message);
      }
    } catch (error) {
      ErrorToast(error.response.data.message);
    }
  };

  useEffect(() => {
    if (!videoId) return;

    dispatch(getVideoDetails(videoId));

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!videoDetails || !user) return;

    setHasLiked(videoDetails?.likes.includes(user?._id));

    // eslint-disable-next-line
  }, [videoDetails]);

  if (status === 'LOADING') {
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
    <Card
      sx={{
        margin: '2rem auto',
        bgcolor: '#ffffff',
        width: { xs: '90vw', sm: '70vw', md: '50vw' },
        marginTop: 5,
      }}
    >
      <ReactPlayer
        url={videoDetails?.video}
        width='100%'
        height='100%'
        playing={false}
        controls={true}
        volume={1}
      />
      <Box
        sx={{
          padding: 2,
          gap: 15,
        }}
      >
        <Typography
          sx={{
            fontSize: 20,
            fontWeight: 600,
          }}
        >
          {videoDetails?.title}
        </Typography>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 4,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <img
              src={videoDetails?.creator?.profilePic}
              alt={videoDetails?.creator?.name}
              style={{
                width: '3rem',
                height: '3rem',
                objectFit: 'cover',
                borderRadius: '100%',
              }}
            />

            <Typography
              sx={{
                color: '#4a4a4a',
                fontSize: 17,
                fontWeight: 500,
              }}
            >
              {videoDetails?.creator?.name}
            </Typography>
          </Box>
          <CardActions>
            <IconButton aria-label='like' onClick={handleUserLike}>
              <Tooltip title='Like'>
                {hasLiked ? (
                  <Favorite
                    sx={{
                      color: 'red',
                    }}
                  />
                ) : (
                  <Favorite
                    sx={{
                      color: 'grey',
                    }}
                  />
                )}
              </Tooltip>
            </IconButton>
            <IconButton aria-label='like' onClick={handleUserLike}>
              <Tooltip title='Share'>
                <ShareOutlined />
              </Tooltip>
            </IconButton>
          </CardActions>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            color: '#7c7c7c',
            fontSize: 16,
            gap: 4,
          }}
        >
          <Typography
            fontSize={18}
          >{`${videoDetails?.views} views`}</Typography>
          <Moment fromNow>{videoDetails?.createdAt}</Moment>
        </Box>

        <Typography>{videoDetails?.description}</Typography>
      </Box>
      <hr />
      <CommentsSection videoId={videoId} />
    </Card>
  );
}
