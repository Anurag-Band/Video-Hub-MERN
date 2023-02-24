import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../features/user/userSlice';
import Logo from '../assets/Logo.png';

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  // const [isNotificationReceived, setIsNotification]

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    setAnchorEl(null);
    dispatch(logoutUser());

    navigate('/login');
  };

  return (
    <AppBar
      position='relative'
      sx={{
        width: '100%',
        overflowX: 'hidden',
        position: 'sticky',
        top: 0,
        zIndex: 999,
        bgcolor: '#ff1919',
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          margin: '0 6rem',
        }}
      >
        <Box
          component={Link}
          to={'/'}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 3,
            color: 'inherit',
            textDecoration: 'inherit',
          }}
        >
          <img
            src={Logo}
            alt='Dating Hub'
            style={{
              width: '3.5rem',
            }}
          />
          <Typography
            sx={{
              fontSize: '30px',
              fontWeight: '600',
              color: 'white',
            }}
          >
            Video Hub
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {isAuthenticated && (
            <Box>
              <IconButton
                id='basic-button'
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                <img
                  src={user?.profilePic}
                  alt={user?.name}
                  style={{
                    width: '4rem',
                    height: '4rem',
                    objectFit: 'cover',
                    borderRadius: '100%',
                  }}
                />
              </IconButton>
              <Menu
                id='basic-menu'
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
                sx={{
                  gap: 5,
                }}
              >
                {isAuthenticated && user?.role === 'creator' && (
                  <MenuItem
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '6px 30px',
                    }}
                    onClick={() => navigate('/creator/video/upload')}
                  >
                    <Typography>Upload New Video</Typography>
                  </MenuItem>
                )}
                <MenuItem
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '6px 30px',
                  }}
                  onClick={handleLogOut}
                >
                  <Typography>Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
