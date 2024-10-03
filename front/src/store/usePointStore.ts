import { create } from 'zustand';

// Zustand 스토어 생성
interface PointStore {
  point: number;
  setPoint: (newPoint: number) => void;
  setPlusPoint: (updater: (prevPoint: number | null) => number) => void;
}

const usePointStore = create<PointStore>((set) => ({
  point: 0, // 초기값을 0으로 설정
  setPoint: (newPoint: number) => set({ point: newPoint }),
  setPlusPoint: (updater) =>
    set((state) => ({
      point: updater(state.point), // point를 업데이트하는 콜백 함수 사용
    })),
}));

export default usePointStore;
