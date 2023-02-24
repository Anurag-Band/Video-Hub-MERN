import { Box, Typography } from '@mui/material';
import React from 'react';
import Moment from 'react-moment';

export default function ReplyCard({ reply }) {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 5,
        margin: '20px 0',
      }}
    >
      {/* Left Section */}
      <img
        src={reply?.user?.profilePic}
        alt={reply?.user?.name}
        style={{
          width: '3rem',
          height: '3rem',
          objectFit: 'cover',
          borderRadius: '100%',
          marginTop: 5,
        }}
      />
      {/* Right Section */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'start',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 3,
          }}
        >
          <Typography
            sx={{
              color: '#7c7c7c',
              fontSize: 16,
            }}
          >
            {reply?.user?.name}
          </Typography>
          <Moment
            fromNow
            style={{
              display: 'flex',
              alignItems: 'center',
              color: '#7c7c7c',
              fontSize: 16,
              gap: 4,
            }}
          >
            {reply?.repliedAt}
          </Moment>
        </Box>
        <Typography>{reply?.content}</Typography>
      </Box>
    </Box>
  );
}
