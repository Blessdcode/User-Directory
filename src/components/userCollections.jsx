/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { BiMobile, BiTrash } from "react-icons/bi";
import { FiMail } from "react-icons/fi";
import { AddUserCard } from "./addUserForm";

const UserCollections = ({ users = [], handlerDeleteUser }) => {
  const [showFormModel, setShowFormModel] = useState(false);
  const handleFormModel = () => {
    setShowFormModel(!showFormModel);
  };
  return (
    <div className="group rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow">
      {users.length === 0 ? (
        <div className="flex justify-center items-center border border-dashed border-gray-300 rounded-lg h-64 flex-col space-y-4">
          <button
            className="px-4 py-2 bg-gray-900 text-white rounded-lg shadow hover:bg-gray-800 transition cursor-pointer"
            onClick={handleFormModel}
          >
            + Add User
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {users.map((user) => (
            <div
              key={user.id}
              className="relative bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <span
                className="absolute right-0 mr-1.5 bg-red-300 p-2 text-center rounded-full text-red-800  cursor-pointer"
                onClick={() => handlerDeleteUser(user.id)}
              >
                <BiTrash size={24} />
              </span>

              <div className="flex flex-col items-center text-center">
                <img
                  src={user.picture}
                  alt={user.name}
                  className="w-28 h-28 rounded-full object-cover mb-4 border-2 border-gray-100"
                />
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {user.name}
                </h3>
                <div className="flex items-center flex-col text-gray-600 mb-3">
                  <div className="flex items-center">
                    <FiMail className="w-4 h-4 mr-1" />
                    <span className="text-sm break-all">{user.email}</span>
                  </div>
                  <div className="flex items-center">
                    <BiMobile className="w-4 h-4 mr-1" />
                    <span className="text-sm break-all">{user.phone}</span>
                  </div>
                </div>
                {!user.isApiUser ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    Offline
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Online
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      {showFormModel && (
        <AddUserCard
          setShowFormModel={setShowFormModel}
        />
      )}
    </div>
  );
};

export default UserCollections;
