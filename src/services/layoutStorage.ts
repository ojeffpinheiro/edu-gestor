import { LayoutConfig } from "../types/classroom/Team";

const LAYOUT_KEY = 'savedLayouts';

export const layoutStorage = {
  save: (name: string, layout: LayoutConfig) => {
    const saved = JSON.parse(localStorage.getItem(LAYOUT_KEY) || '[]');
    const updated = [...saved, { name, layout }];
    localStorage.setItem(LAYOUT_KEY, JSON.stringify(updated));
    return updated;
  },

  loadAll: () => {
    return JSON.parse(localStorage.getItem(LAYOUT_KEY) || '[]');
  },

  delete: (name: string) => {
    const saved = JSON.parse(localStorage.getItem(LAYOUT_KEY) || '[]');
    const updated = saved.filter((l: any) => l.name !== name);
    localStorage.setItem(LAYOUT_KEY, JSON.stringify(updated));
    return updated;
  }
};