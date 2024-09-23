import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// 스토어의 상태 타입 정의
interface AuthState {
  memberId: Number | null;
  memberName: string | null;
  isLogin: boolean;
  login: (params: LoginParams) => void;
  logout: () => void;
}

// 로그인 함수의 파라미터 타입 정의
interface LoginParams {
  memberId: Number;
  memberName: string;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      memberId: null,
      memberName: null,
      isLogin: false,
      login: ({ memberId, memberName }: LoginParams) =>
        set({ memberId, memberName, isLogin: true }),
      // login: () => set({ isLogin: true }),
      logout: () => set({ memberId: null, memberName: null, isLogin: false }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        memberId: state.memberId,
        memberName: state.memberName,
        isLogin: state.isLogin,
      }),
    }
  )
);

export default useAuthStore;
