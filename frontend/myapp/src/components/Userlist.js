// src/components/UserList.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function UserList() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const navigate = useNavigate();
  const handlePageChange = (newPage) => {
    console.log("button is clicked");
    setCurrentPage(newPage);
  };
  const handleDeleteUser = (userId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!isConfirmed) {
      return;
    }
    // Make a DELETE request to the server to delete the user
    fetch(`http://localhost:3000/api/userdelete/${userId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          // Update the local state after successful deletion
          setUsers((prevUsers) =>
            prevUsers.filter((user) => user.id !== userId)
          );
        } else {
          console.error("Failed to delete user.");
        }
      })
      .catch((error) => console.error("Error deleting user:", error));
  };
  const fetchData = async () => {
    try {
      console.log("Called API");
      const response = await fetch(
        `http://localhost:3000/api/users?page=${currentPage}`
      );
      const data = await response.json();
      setTotalPage(data.totalPages);
      setUsers(data.users);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [currentPage]);

  return (
    <div>
      <div className="flex flex-col mt-[150px] shadow-lg hover:shadow-2xl transition duration-500">
      <h1 className="text-2xl font-bold mb-4 font-serif text-green-900">User Dashboard</h1>

        <div className="inline-block w-full max-h-screen px-10 overflow-hidden overflow-x-auto sm:-mx-6 lg:-mx-8 ">
          <div className="py-2 sm:px-6 lg:px-8 bg-green-50 border shadow-lg border-gray-400 rounded-md ">
            <div className="overflow-auto">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-900">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      ID
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Username
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Role
                    </th>
                    <th scope="col" className="px-4 py-2 font-normal">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr
                      className="border-b dark:border-neutral-900"
                      key={user.id}
                    >
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {user.id}
                      </td>
                      <td className="">
                        <Link to={`/user/${user.id}`}>{user.username}</Link>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {user.email}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {user.role}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="font-sm text-red-400"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div class="flex justify-around pt-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                class="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Previous
              </button>
              <span className="text-gray-600 text-sm mx-2 my-2">
                Page {currentPage}
              </span>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPage}
                class="flex items-center justify-center px-3 h-8 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      <button
        className="items-center justify-center px-3 h-8 mt-6 text-lg font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-green-00 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        onClick={() => navigate("/create")}
      >
        Create User
      </button>
    </div>
  );
}

export default UserList;
