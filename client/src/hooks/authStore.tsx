import { AuthService } from "@/services/auth/auth.service";
import { loginDTO, signupDTO } from "@/services/auth/validation";
import { create } from "zustand";

type AuthState = {
  user: unknown;
  loading: boolean;
  error: string | null;
  clearError: () => void;
  login: (credentials: loginDTO) => Promise<{
    success: boolean;
    error?: string;
  }>;
  signup: (credentials: signupDTO) => Promise<{
    success: boolean;
    error?: string;
  }>;
};

export const useAuth = create<AuthState>((set) => ({
  user: null,
  loading: false,
  error: null,
  clearError: () => {
    set({ error: null, loading: false });
  },
  
  login: async (credentails: loginDTO) => {
    set({ loading: true, error: null });

    try {
      const response = await AuthService.login(credentails);
      if (!response) {
        throw new Error("Login failed");
      }
      set({ loading: false, user: response, error: null });
      return {
        success: true,
      };
    } catch (err: any) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "An error occurred";

      set({
        error: message,
        loading: false,
      });

      return {
        success: false,
        error: message,
      };
    }
  },
  signup: async (credentails: signupDTO) => {
    set({ loading: true, error: null });

    try {
      const response = await AuthService.signup(credentails);
      if (!response) {
        throw new Error("Login failed");
      }
      set({ loading: false, user: response, error: null });
      return {
        success: true,
      };
    } catch (err: any) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "An error occurred";

      set({
        error: message,
        loading: false,
      });

      return {
        success: false,
        error: message,
      };
    }
  },
}));
