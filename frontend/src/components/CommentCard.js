import ReplyIcon from '@mui/icons-material/Reply';
import {
  Box,
  CardActions,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import Moment from 'react-moment';
import { useSelector } from 'react-redux';
import { ErrorToast, SuccessToast } from '../utils/CustomToast';
import ReplyCard from './ReplyCard';

export default function CommentCard({ cmt }) {
  const user = useSelector((state) => state.user.user);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [reply, setReplay] = useState('');

  const [showAllReplies, setShowAllReplies] = useState(false);

  const handleReplyToggle = () => {
    setShowReplyInput((prev) => !prev);
  };

  const handleAllRepliesToggle = () => {
    if (showReplyInput === true && showAllReplies === true) {
      setShowReplyInput(false);
      setShowAllReplies(false);
    } else {
      setShowAllReplies((prev) => !prev);
    }
  };

  const handleReplySubmit = async () => {
    if (!user || !cmt) return;

    const formData = new FormData();
    formData.append('commentId', cmt?._id);
    formData.append('replyContent', reply);

    try {
      const config = { headers: { 'Content-Type': 'application/json' } };
      const { data } = await axios.post(
        `/api/v1/video/comment/reply`,
        formData,
        config
      );

      if (data?.success === true) {
        SuccessToast(data.message);
        setReplay('');
      }
    } catch (error) {
      ErrorToast(error.response.data.message);
    }
  };

  return (
    <Box margin={'10px 0'}>
      <Box
        sx={{
          display: 'flex',
          gap: 5,
          margin: '10px 0',
        }}
      >
        {/* Left Section */}
        <img
          src={cmt?.mainComment?.user?.profilePic}
          alt={cmt?.mainComment?.user?.name}
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
              {cmt?.mainComment?.user?.name}
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
              {cmt?.createdAt}
            </Moment>
            <CardActions>
              <IconButton aria-label='Reply' onClick={handleReplyToggle}>
                <Typography
                  sx={{
                    color: 'blue',
                  }}
                >
                  Reply
                </Typography>
              </IconButton>
            </CardActions>
          </Box>
          <Typography>{cmt?.mainComment?.content}</Typography>
        </Box>
      </Box>
      <Box ml={6}>
        {cmt?.replies.length > 0 && (
          <CardActions>
            <IconButton aria-label='Replies' onClick={handleAllRepliesToggle}>
              <Typography
                sx={{
                  color: 'blue',
                }}
              >
                {`${cmt?.replies.length} Replies`}
              </Typography>
            </IconButton>
          </CardActions>
        )}
      </Box>
      {showReplyInput && (
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
            id='reply'
            variant='standard'
            label='Reply'
            reply='reply'
            autoComplete='reply'
            value={reply}
            onChange={(e) => setReplay(e.target.value)}
          />
          <IconButton
            type='submit'
            aria-label='reply'
            onClick={handleReplySubmit}
          >
            <Tooltip title='Reply'>
              <ReplyIcon fontSize={'10'} />
            </Tooltip>
          </IconButton>
        </Box>
      )}
      {showAllReplies && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 3,
            ml: 10,
          }}
        >
          {cmt?.replies?.map((reply, index) => (
            <ReplyCard key={index} reply={reply} />
          ))}
        </Box>
      )}
    </Box>
  );
}
