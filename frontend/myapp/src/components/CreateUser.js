import React from "react";
import { useState } from "react";
import { useNavigate,useFetcher } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

const CreateUser = () => {
  const navigate = useNavigate();
  const [editedDetails, setEditedDetails] = useState({
    username: "",
    email: "",
    role: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };
  const handlecreateuser = async (e) => {
    e.preventDefault();
    if (!editedDetails.username || !editedDetails.email || !editedDetails.role) {
      toast.error('Please enter a valid fields.')
      return;
    }
    const emailPattern = /\S+@\S+/;
  if (!emailPattern.test(editedDetails.email)) {
    toast.error('Please enter a valid email address.');
    return;
  }
    const formData = {
      username: editedDetails.username,
      email: editedDetails.email,
      role: editedDetails.role,
    };
    try {
      const response = await fetch(`http://localhost:3000/api/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log("User updated successfully");
        navigate("/");
      } else {
        console.error("Failed to update user:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
    console.log("submit created");
  };
  return (
    <>
    <Toaster/>
    <form class="max-w-sm mx-auto mt-[150px] border rounded-md border-black hover:bg-green-50 shadow-lg hover:shadow-2xl transition duration-500">
      <div className="mb-[50px] font-medium text-green-900 pt-3">Create User</div>

      <div class="mb-5">
        <label className="block mb-4 px-8 py-1">
          User name:
          <input
            type="text"
            name="username"
            value={editedDetails.username}
            onChange={handleChange}
            className="border rounded-md border-gray-300 p-2 w-full mt-1"
            required
          />
        </label>
        <label className="block mb-4 px-8 py-1">
        Email:
              <input
                type="email"
                name="email"
                value={editedDetails.email}
                onChange={handleChange}
                className="border rounded-md border-gray-300 p-2 w-full mt-1" placeholder="name@flowbite.com" required
              />
        </label>
        <label className="block mb-4 px-8 py-1">
          Role:
          <input
            type="text"
            name="role"
            value={editedDetails.role}
            onChange={handleChange}
            className="border rounded-md border-gray-300 p-2 w-full mt-1"
            required
          />
        </label>
      </div>
      <div className="flex pt-6 pb-6 gap-4 justify-center">
        <button
          type="submit"
          onClick={handlecreateuser}
          class=" text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-xl sm:w-auto px-2 py-2 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Submit
        </button>
        <button
          type="back"
          class= " text-white bg-gray-400 hover:bg-black focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-lg sm:w-auto px-2 py-2 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          onClick={() => navigate("/")}
        >
          Back
        </button>
      </div>
    </form>
    </>
  );
};

export default CreateUser;
