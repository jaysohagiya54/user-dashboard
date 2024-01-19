import React from "react";
import { useState } from "react";
import { useNavigate,useFetcher } from "react-router-dom";
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
      alert('Please fill in all fields.');
      return;
    }
    const emailPattern = /\S+@\S+/;
  if (!emailPattern.test(editedDetails.email)) {
    alert('Please enter a valid email address.');
    return;
  }
    const formData = {
      username: editedDetails.username,
      email: editedDetails.email,
      role: editedDetails.role,
    };
    console.log(JSON.stringify(formData));
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
    <form class="max-w-sm mx-auto mt-[150px]">
      <div className="mb-[50px] font-medium text-blue-500">Create User</div>

      <div class="mb-5">
        <label className="block mb-4">
          User name:
          <input
            type="text"
            name="username"
            value={editedDetails.username}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full mt-1"
            required
          />
        </label>
        <label className="block mb-4">
          Email:
          <input
            type="email"
            name="email"
            value={editedDetails.email}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full mt-1"
            placeholder="name@flowbite.com"
            required
          />
        </label>
        <label className="block mb-4">
          Role:
          <input
            type="text"
            name="role"
            value={editedDetails.role}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full mt-1"
            required
          />
        </label>
      </div>
      <div className="flex">
        <button
          type="submit"
          onClick={handlecreateuser}
          class="ml-[100px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
        <button
          type="back"
          class="ml-[20px] text-white bg-gray-400 hover:bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={() => navigate("/")}
        >
          Back
        </button>
      </div>
    </form>
  );
};

export default CreateUser;
