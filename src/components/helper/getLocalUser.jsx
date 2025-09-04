import { LocalKey } from "./localkey";

export const getSavedUsers = () => {
  try {
    const storedData = localStorage.getItem(LocalKey);
    const parsed = JSON.parse(storedData);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch (error) {
    console.error("Error getting localStorage:", error);
  }
};


