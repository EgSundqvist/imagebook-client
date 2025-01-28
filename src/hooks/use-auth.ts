import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setToken, setUser, clearAuth } from '../redux/slices/auth-slice';
import { loginUser } from '../services/user-profile-service';
import { useNotification } from './use-notifications';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { User } from '../types/user';
import { Profile } from '../types/profile';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useRef } from 'react';



interface DecodedToken {
  exp: number;
}

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { notificationOpen, notificationType, notificationMessage, showNotification, handleNotificationClose } = useNotification();
  const authState = useSelector((state: RootState) => state.auth);
  const logoutTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await loginUser({ email, password });
      if (response.status === 200) {
        const { access_token, user }: { access_token: string; user: User } = response.data;
        const decodedToken = jwtDecode<DecodedToken>(access_token);
        const expiryTime = decodedToken.exp * 1000;
        console.log('Token Expiry Time:', new Date(expiryTime).toLocaleString());
        dispatch(setToken({ token: access_token, expiry: expiryTime }));
        dispatch(setUser(user));
        navigate('/home');
        startLogoutTimer(expiryTime);
        return response;
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const errorMessage = err.response?.data?.message || 'An error occurred';
        showNotification('error', errorMessage);
      } else {
        showNotification('error', 'An error occurred');
      }
      throw err;
    }
  };

  const handleLogout = () => {
    console.log('Logging out...');
    dispatch(clearAuth());
    navigate('/login');
    if (logoutTimerRef.current) {
      clearTimeout(logoutTimerRef.current);
    }
  };

  const updateUserProfile = (profile: Profile) => {
    dispatch(setUser({ ...authState.user, profile } as User));
  };

  const startLogoutTimer = (expiryTime: number) => {
    const currentTime = Date.now();
    const timeout = expiryTime - currentTime;

    const hours = Math.floor(timeout / (1000 * 60 * 60));
    const minutes = Math.floor((timeout % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeout % (1000 * 60)) / 1000);
    console.log(`Starting logout timer: ${hours} hours, ${minutes} minutes, and ${seconds} seconds`);

    logoutTimerRef.current = setTimeout(() => {
      handleLogout();
    }, timeout);
  };

  const checkTokenValidityOnMount = () => {
    const { token, tokenExpiry } = authState;
    if (token && tokenExpiry) {
      const currentTime = Date.now();
      if (tokenExpiry < currentTime) {
        handleLogout();
      } else {
        console.log('Token is still valid. Setting logout timer.');
        startLogoutTimer(tokenExpiry);
      }
    }
  };

  useEffect(() => {
    console.log('Checking token validity on mount.');
    checkTokenValidityOnMount();
  }, []);

  return {
    ...authState,
    notificationOpen,
    notificationType,
    notificationMessage,
    handleNotificationClose,
    handleLogin,
    handleLogout,
    updateUserProfile,
    checkTokenValidityAndSetTimer: checkTokenValidityOnMount,
  };
};

