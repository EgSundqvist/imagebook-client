import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getToken, saveToken, removeToken } from '../../utils/localstorage';
import { User } from '../../types/user';

interface AuthState {
  token: string | null;
  user: User | null;
  tokenExpiry: number | null;
}

const initialState: AuthState = {
  token: getToken(),
  user: null,
  tokenExpiry: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<{ token: string; expiry: number }>) {
      state.token = action.payload.token;
      state.tokenExpiry = action.payload.expiry;
      saveToken(action.payload.token);
    },
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    clearAuth(state) {
      state.token = null;
      state.user = null;
      state.tokenExpiry = null;
      removeToken();
    },
  },
});

export const { setToken, setUser, clearAuth } = authSlice.actions;
export default authSlice.reducer;