// src/stores/allStockStore.ts
import { create } from 'zustand';
import { IStock } from '@features/Stock/types';

// Define the state and actions for the store
interface AllStockStore {
  allStock: IStock[];
  setAllStock: (data: IStock[]) => void;
}

// Create the store
const useAllStockStore = create<AllStockStore>((set) => ({
  allStock: [],
  setAllStock: (data: IStock[]) => set({ allStock: data }),
}));

export default useAllStockStore;
