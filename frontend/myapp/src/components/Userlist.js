// src/components/UserList.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


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
    const isConfirmed = window.confirm('Are you sure you want to delete this user?');
    if (!isConfirmed) {
      return;
    }
    // Make a DELETE request to the server to delete the user
    fetch(`http://localhost:3000/api/userdelete/${userId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          // Update the local state after successful deletion
          setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
        } else {
          console.error('Failed to delete user.');
        }
      })
      .catch((error) => console.error('Error deleting user:', error));
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
    
      <div className="flex flex-col mt-[100px]">
          <h2 className="mt-11 mb-11 text-center text-lg font-semibold">User List</h2>
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block py-2 sm:px-6 lg:px-8 bg-blue-200 border rounded-md ">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
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
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr
                      className="border-b dark:border-neutral-500"
                      key={user.id}
                    >
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {user.id}
                      </td>
                      <td className="text-center">
                <Link to={`/user/${user.id}`}>{user.username}</Link>
              </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {user.email}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {user.role}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                      <button onClick={() => handleDeleteUser(user.id)} className="font-sm">
                        ❌
                     </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="float-center my-2 mx-2">
            <button
              className=" text-white py-2 px-4 rounded cursor-pointer"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              ⬅
            </button>
            <span className="text-gray-600 text-sm mx-2">Page {currentPage}</span>
            <button
              className= "text-white py-2 px-4 rounded cursor-pointer"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPage}
            >
              ➡️
            </button>
          </div>           
        
         </div>
         
        </div>
      </div>
      <button className="border-black-md mt-[40px] text-lg text-cyan-800 rounded-md bg-slate-100 w-[140px]" onClick={() => navigate('/create')}>Create User</button>   

    </div>
  );
}

export default UserList;
