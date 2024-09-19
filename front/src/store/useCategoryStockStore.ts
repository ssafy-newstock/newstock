import { create } from 'zustand';
import { ICategoryStock } from '@features/Stock/types';

// Define the state and actions for the store
interface CategoryStockStore {
  categoryStock: ICategoryStock[];
  setCategoryStock: (data: ICategoryStock[]) => void;
}

// Create the store
const useCategoryStockStore = create<CategoryStockStore>((set) => ({
  categoryStock: [],
  setCategoryStock: (data: ICategoryStock[]) => set({ categoryStock: data }),
}));

export default useCategoryStockStore;
