import { LocalKey } from "../../utils/localkey";

export const removeFromStorage = (id) => {
  const existingUsers = JSON.parse(localStorage.getItem(LocalKey) || []);
  const updatedUsers = existingUsers.filter((user) => user.id !== id);
  localStorage.setItem(LocalKey, JSON.stringify(updatedUsers));
  return updatedUsers;
};
