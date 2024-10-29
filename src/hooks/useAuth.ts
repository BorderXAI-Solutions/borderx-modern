import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  isAuthenticated: false,
  login: () => {
    set({ isAuthenticated: true });
    return true;
  },
  logout: () => set({ isAuthenticated: false }),
}));