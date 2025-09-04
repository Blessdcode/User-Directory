import { useEffect, useState } from "react";
import { Header } from "./custom/header";
import { Toolbar } from "./Toolbar";
import { getSavedUsers } from "./helper/getLocalUser";
import UserCollections from "./userCollections";
import { removeFromStorage } from "./helper/removeFromStorage";

const UserDirectoryApp = () => {
  const [userData, setUserData] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [_error, setError] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("https://randomuser.me/api/?results=10");
        const data = await res.json();
        const apiUsersResults = data.results.map((user) => ({
          id: user.login.uuid,
          name: `${user.name.first} ${user.name.last}`,
          email: user.email,
          phone: user.phone,
          location: `${user.location.city}, ${user.location.country}`,
          picture: user.picture.large,
          dob: user.dob.age,
          isApiUser: true,
        }));

        const savedUsers = getSavedUsers();
        const allUsers = [...savedUsers, ...apiUsersResults];
        console.log("All Users:", allUsers);
        setUserData(allUsers);
        setFilteredUsers(allUsers);
        setQuery("");
        setLoading(false);
      } catch (error) {
        console.log("Error fetching users:", error);
        const savedUsers = getSavedUsers();
        setUserData(savedUsers);
        setFilteredUsers(savedUsers);
        setLoading(false);
        setError("Failed to fetch users from API, showing saved users only.");
      }
    };
    fetchUsers();
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
    alert("User delete successfully!");
    setUserData(updatedUsers);
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
