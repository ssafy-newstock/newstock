import { create } from 'zustand';

// Zustand 스토어 생성
interface PointStore {
  point: string | '';
  setPoint: (newPoint: string) => void;
}

const usePointStore = create<PointStore>((set) => ({
  point: '',
  setPoint: (newPoint) => set({ point: newPoint }),
}));

export default usePointStore;
