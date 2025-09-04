/* eslint-disable no-unused-vars */
import { useEffect, useMemo, useState } from "react";
import { Header } from "./custom/header";
import SaveLocalStore from "./helper/saveLocalStore";
import { Toolbar } from "./Toolbar";
import { getSavedUsers } from "./helper/getLocalUser";
import UserCollections from "./userCollections";

const initialFormatData = {
  name: "",
  email: "",
  phone: "",
  location: "",
  picture: "",
  dob: "",
};

const UserDirectoryApp = () => {
  const [userData, setUserData] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
        console.log("Saved Users from localStorage:", savedUsers);

        const allUsers = [...apiUsersResults, ...savedUsers];
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

  

  return (
    <div>
      <Header
        logoText="UD"
        titleText="User Directory"
        setUserData={setUserData}
      />
      <Toolbar query={query} setQuery={setQuery} total={filteredUsers.length} />

      <main className="">
        <UserCollections users={filteredUsers} query={query} />
      </main>
    </div>
  );
};

export default UserDirectoryApp;
