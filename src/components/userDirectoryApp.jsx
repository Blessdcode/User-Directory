import { useEffect, useState } from "react";
import { Header } from "./custom/header";
import { Toolbar } from "./Toolbar";
import UserCollections from "./userCollections";
import { removeFromStorage } from "./helper/removeFromStorage";
import { getSavedUsers } from "./helper/getSavedUsers";
import SaveLocalStore from "./helper/saveLocalStore";

const UserDirectoryApp = () => {
  const [userData, setUserData] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [_error, setError] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const savedUsers = getSavedUsers();

        if (savedUsers.length > 0) {
          setUserData(savedUsers);
          setFilteredUsers(savedUsers);
          setLoading(false);
          return;
        }

        const res = await fetch("https://randomuser.me/api/?results=10");
        const data = await res.json();
        const apiUsersResults = data.results.map((user) => ({
          id: user.login.uuid,
          name: `${user.name.first} ${user.name.last}`,
          email: user.email,
          phone: user.phone,
          picture: user.picture.large,
          isApiUser: true,
        }));

        SaveLocalStore(apiUsersResults);
        setUserData(apiUsersResults);
        setFilteredUsers(apiUsersResults);
        setLoading(false);
      } catch (error) {
        console.log("Error initializing users:", error);
        setUserData([]);
        setFilteredUsers([]);
        setLoading(false);
        setError("Failed to fetch users");
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (userData.length > 0) {
      const filtered = userData.filter(
        (user) =>
          user.name.toLowerCase().includes(query.toLowerCase()) ||
          user.email.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [query, userData]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  const handlerDeleteUser = (id) => {
    const updatedUsers = removeFromStorage(id);
    setUserData(updatedUsers);

    setFilteredUsers(() => {
      const q = query.trim().toLowerCase();
      if (!q) return updatedUsers;
      return updatedUsers.filter(
        (user) =>
          (user.name || "").toLowerCase().includes(q) ||
          (user.email || "").toLowerCase().includes(q)
      );
    });

    alert("User deleted successfully");
  };
  return (
    <div>
      <Header
        logoText="UD"
        titleText="User Directory"
        setUserData={setUserData}
      />
      <Toolbar query={query} setQuery={setQuery} total={filteredUsers.length} />

      <main className="">
        <UserCollections
          users={filteredUsers}
          query={query}
          handlerDeleteUser={handlerDeleteUser}
        />
      </main>
    </div>
  );
};

export default UserDirectoryApp;
