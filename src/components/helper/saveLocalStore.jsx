import { LocalKey } from "../../utils/localkey";

const SaveLocalStore = (users) => {
  try {
    const storeArray = Array.isArray(users) ? users : [];
    localStorage.setItem(LocalKey, JSON.stringify(storeArray));
    return storeArray;
  } catch (error) {
    console.error("Error saving to localStorage:", error);
    return [];
  }
};

export default SaveLocalStore;
