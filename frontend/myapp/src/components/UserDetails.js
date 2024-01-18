// src/components/UserDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import EditUserModal from "./EditUserModal";
import { useNavigate } from "react-router-dom";


function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const navigate = useNavigate();
  const handleEdit = () => {
    // Open the edit modal
    setIsEditModalOpen(true);
  };
  const handleCloseEditModal = () => {
    // Close the edit modal
    setIsEditModalOpen(false);
  };
  const handleSaveChanges = (editedDetails) => {
    // Handle logic to save edited details (e.g., send API request)
    console.log("Save changes:", editedDetails);
  };
  useEffect(() => {
    // Replace the URL with your backend API endpoint
    fetch(`http://localhost:3000/api/user/${id}`)
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => console.error('Error fetching user details:', error));
  }, [id]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="px-10">
      <div class="bg-white max-w-xl rounded-2xl px-10 py-8 shadow-lg hover:shadow-2xl transition duration-500">
       
        <div class="mt-4">
          <h1 class="text-lg text-gray-700 font-semibold hover:underline cursor-pointer">{user.username}</h1>
         
          <p class="mt-4 text-md text-gray-600">ID: {user.id} Role: {user.role}</p>
          <div class="flex justify-between items-center">
            <div class="mt-4 flex items-center space-x-4 py-6">
              </div>
              <button
              onClick={handleEdit}
              className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600"
            >
              Edit
            </button>
              <button
              onClick={() => navigate('/')}
              className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
    <EditUserModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        onEdit={handleSaveChanges}
        id={id}
      />
  </div>
  );
}

export default UserDetails;
