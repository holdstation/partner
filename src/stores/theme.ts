import { create } from "zustand";
import { persist } from "zustand/middleware";

type ITheme  = "dark" | "light"

interface ThemeStorage {
    theme: ITheme
    setTheme: (data: ITheme) => void;
  }

export const useTheme = create<ThemeStorage>()(
  persist(
    (set) => ({
      theme: "light",
      setTheme: (t: "dark" | "light") => set({ theme: t }),
    }),
    {
      name: "cms-theme", // name of the item in the storage (must be unique)
    }
  )
);
