import { LocalKey } from "../../utils/localkey";

export const getSavedUsers = () => {
try {
  const raw = localStorage.getItem(LocalKey);
  if (!raw) return [];
  const parsed = JSON.parse(raw);
  return Array.isArray(parsed) ? parsed : [];
} catch (err) {
  console.error("Error getting localStorage:", err);
  return [];
}
};
