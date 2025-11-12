import { create } from 'zustand';
import type { UserInfo } from '../types/account';

interface UserInfoStore {
  userInfo: UserInfo | null;
  setUserInfo: (userInfo: UserInfo) => void;
}

export const useUserInfoStore = create<UserInfoStore>(set => ({
  userInfo: null,
  setUserInfo: userInfo => set({ userInfo }),
}));
