import { LocalKey } from "../../utils/localkey";

const SaveLocalStore = (users) => {
  const storeArray = Array.isArray(users) ? users : [];
  const existingData = JSON.parse(localStorage.getItem(LocalKey)) || [];
  const newUser = storeArray.filter((user) => !user.isApiUser);
  const savedUsers = [...existingData, ...newUser];
  localStorage.setItem(LocalKey, JSON.stringify(savedUsers));
  return savedUsers;
};

export default SaveLocalStore;
