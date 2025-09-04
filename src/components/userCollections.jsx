/* eslint-disable no-unused-vars */
import React from "react";

const UserCollections = ({ users = [], query = "" }) => {
  console.log("User Collections Component:", users);

  return (
    <div className="group rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow">
      {/* Users Grid */}
      {/* {users.length === 0 ? (
        // <div className="text-center py-12">
        //   <div className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        //   <h3 className="text-lg font-medium text-gray-900 mb-2">
        //     No users found
        //   </h3>
        //   <p className="text-gray-600 mb-4">

        //     {query
        //       ? "Try adjusting your search terms"
        //       : "Start by adding some users"}
        //   </p>
        // </div>
        <div></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col items-center text-center">
                <img
                  src={user.picture}
                  alt={user.name}
                  className="w-20 h-20 rounded-full object-cover mb-4 border-2 border-gray-100"
                />
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {user.name}
                </h3>
                <div className="flex items-center text-gray-600 mb-3">
                  <div className="w-4 h-4 mr-1" />
                  <span className="text-sm break-all">{user.email}</span>
                </div>
                {!user.isApiUser && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Added by you
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )} */}

      {/* {
        users.length > 0 ? (<div>yes</div>) : (<div>no</div>)
      } */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col items-center text-center">
              <img
                src={user.picture}
                alt={user.name}
                className="w-20 h-20 rounded-full object-cover mb-4 border-2 border-gray-100"
              />
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {user.name}
              </h3>
              <div className="flex items-center text-gray-600 mb-3">
                <div className="w-4 h-4 mr-1" />
                <span className="text-sm break-all">{user.email}</span>
              </div>
              {!user.isApiUser && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Added by you
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserCollections;
