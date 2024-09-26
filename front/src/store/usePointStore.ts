import { create } from 'zustand';

// Zustand 스토어 생성
interface PointStore {
  point: number | 0;
  setPoint: (newPoint: number) => void;
}

const usePointStore = create<PointStore>((set) => ({
  point: 0,
  setPoint: (newPoint) => set({ point: newPoint }),
}));

export default usePointStore;
