import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/routes/ProtectedRoute';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, loadUser } from './features/user/userSlice';
import { useEffect } from 'react';
import { store } from './store/store';
import { Box } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import CreatorRoute from './components/routes/CreatorRoute';
import LogIn from './pages/auth/LogIn';
import SignUp from './pages/auth/SignUp';
import UploadNewVideo from './pages/creator/UploadNewVideo';

function App() {
  const dispatch = useDispatch();
  const { status, errorMessage } = useSelector((state) => state.user);
  useEffect(() => {
    store.dispatch(loadUser());
  }, [dispatch]);

  useEffect(() => {
    if (status === 'ERROR') {
      setTimeout(() => {
        dispatch(clearErrors());
      }, 2000);
    }
  }, [status, dispatch, errorMessage]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#fff5fb',
      }}
    >
      <Navbar />
      <Routes>
        {/* Un-Protected routes */}
        <Route>
          <Route path='/login' element={<LogIn />} />
          <Route path='/signup' element={<SignUp />} />
        </Route>

        {/* USER protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path='/' element={<Home />} />
        </Route>

        {/* Creator protected routes */}
        <Route element={<CreatorRoute />}>
          <Route path='/creator/video/upload' element={<UploadNewVideo />} />
        </Route>
      </Routes>
      <ToastContainer />
    </Box>
  );
}

export default App;
