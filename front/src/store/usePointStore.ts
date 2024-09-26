import { create } from 'zustand';

// Zustand 스토어 생성
interface PointStore {
  point: string | '';
  allpoint: number | 0;
  setPoint: (newPoint: string) => void;
  setAllPoint: (newPoint: number) => void;
}

const usePointStore = create<PointStore>((set) => ({
  point: '',
  allpoint: 0,
  setPoint: (newPoint) => set({ point: newPoint }),
  setAllPoint: (newPoint) => set({ allpoint: newPoint }),
}));

export default usePointStore;
