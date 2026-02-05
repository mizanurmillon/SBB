import { create } from "zustand";

export const useStore = create(set => ({
  isMenuOpen: true,
  toggleMenu: () => set(state => ({ isMenuOpen: !state.isMenuOpen })),
  closeMenu: () => set({ isMenuOpen: false }),
}));
