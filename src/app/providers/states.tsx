import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useSelectStore = create(persist(
    (set) => ({
      // Estado inicial
      selected: 0,

      // Ações para modificar o estado
      select: () => set((state) => ({ selected: state.selected = !state.selected })),
})));
