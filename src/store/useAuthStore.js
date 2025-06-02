import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: null,
  token: null,
  role: null,
  chapter: [],
  company: null,
  setUser: (userData) => set({ user: userData }),
  setToken: (authToken) => set({ token: authToken }),
  setRole: (userRole) => set({ role: userRole }),  
  setChapter: (allChapter) => set({ chapter: allChapter }),
  setCompany: (userCompany) => set({ company: userCompany }),
  logout: () => set({ user: null, token: null, role: null })
}));

export default useAuthStore;
