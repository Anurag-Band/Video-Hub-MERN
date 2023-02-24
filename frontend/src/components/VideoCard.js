import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { Box, CardContent, Typography } from '@mui/material';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

export default function ProfileCard({ vid }) {
  return (
    <Card
      component={Link}
      to={`/video/${vid?._id}`}
      sx={{
        margin: '0 auto',
        bgcolor: '#ffffff',
        width: '25vw',
        borderRadius: 2,
        boxShadow: 5,
        color: 'inherit',
        textDecoration: 'inherit',
      }}
    >
      <CardMedia
        component='img'
        sx={{
          objectFit: 'contain',
          width: '100%',
          height: '70%',
        }}
        image={vid?.thumbnail}
        alt={vid?.title}
      />
      <CardContent
        sx={{
          bgcolor: 'whitesmoke',
        }}
      >
        <Typography
          sx={{
            fontSize: 20,
            fontWeight: 600,
          }}
        >
          {vid?.title}
        </Typography>

        <Typography
          sx={{
            color: '#7c7c7c',
            fontSize: 16,
          }}
        >
          {vid?.creator?.name}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            color: '#7c7c7c',
            fontSize: 16,
            gap: 4,
          }}
        >
          <Typography fontSize={18}>{`${vid?.views} views`}</Typography>
          <Moment fromNow>{vid?.createdAt}</Moment>
        </Box>
      </CardContent>
    </Card>
  );
}
