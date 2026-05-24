import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserRole } from '@/models';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

/**
 * Auth slice - Dummy implementation
 * TODO: Connect to backend API when ready
 */
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Dummy login - accepts any credentials
    login: (state, action: PayloadAction<{ email: string; password: string }>) => {
      // Create a mock user
      const mockUser: User = {
        id: '1',
        email: action.payload.email,
        firstName: 'Demo',
        lastName: 'User',
        role: UserRole.BUYER,
        department: 'Procurement',
        permissions: ['read', 'write'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      state.user = mockUser;
      state.isAuthenticated = true;
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearAuth: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { login, logout, setUser, clearAuth, clearError } = authSlice.actions;
export default authSlice.reducer;
