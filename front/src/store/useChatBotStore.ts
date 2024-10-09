// useChatStore.ts
import { create } from 'zustand';

interface NewsItem {
  id: number;
  upload_datetime: string;
  title: string;
  media: string;
  thumbnail?: string;
  sentiment: number;
  type: string;
}

export interface Message {
  content: string;
  isMine: boolean;
  relatedNews?: NewsItem[];
}

interface ChatBotState {
  messages: Message[];
  addMessage: (message: Message) => void;
  startDate: Date | null;
  endDate: Date | null;
  showDatePicker: boolean;
  setStartDate: (date: Date | null) => void;
  setEndDate: (date: Date | null) => void;
  toggleDatePicker: () => void;
}

export const useChatStore = create<ChatBotState>((set) => ({
  messages: [],
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  startDate: null,
  endDate: null,
  showDatePicker: false,
  setStartDate: (date) => set({ startDate: date }),
  setEndDate: (date) => set({ endDate: date }),
  toggleDatePicker: () =>
    set((state) => ({ showDatePicker: !state.showDatePicker })),
}));
