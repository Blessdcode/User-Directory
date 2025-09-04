import { LocalKey } from "./localkey";

const SaveLocalStore = (users) => {
 const savedUsers = users.filter((user) => !user.isApiUser);
 localStorage.setItem(LocalKey, JSON.stringify(savedUsers));
};

export default SaveLocalStore;
