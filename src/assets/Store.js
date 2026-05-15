import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,

  login: (userData) => {
    set({ user: userData });
    localStorage.setItem("user", JSON.stringify(userData));
  },

  logout: () => {
    set({ user: null });
    localStorage.removeItem("user");
  },
}));

export default useAuthStore;
