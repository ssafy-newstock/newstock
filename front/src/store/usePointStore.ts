import { create } from 'zustand';

// Zustand 스토어 생성
interface PointStore {
  point: number | null;
  setPoint: (newPoint: number) => void;
}

const usePointStore = create<PointStore>((set) => ({
  point: null,
  setPoint: (newPoint) => set({ point: newPoint }),
}));

export default usePointStore;
