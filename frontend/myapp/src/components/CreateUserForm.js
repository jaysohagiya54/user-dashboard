// src/components/CreateUserForm.js
import React, { useState,useEffect } from 'react';

function CreateUserForm({ onCreateUser }) {
    const [id, setId] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation logic can be added here

    // Create a new user object
    const newUser = {
    id,
      username,
      email,
      role,
    };

    // Pass the new user data to the parent component for API request
    onCreateUser(newUser);

    // Clear the form fields
    setId('');
    setUsername('');
    setEmail('');
    setRole('');
  };

  return (
    <form onSubmit={handleSubmit}>
    <label>
        ID:
        <input type="number" value={id} onChange={(e) => setId(e.target.value)} />
      </label>
      <br />
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <br />
      <label>
        Email:
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <br />
      <label>
        Role:
        <input type="text" value={role} onChange={(e) => setRole(e.target.value)} />
      </label>
      <br />
      <button type="submit">Create User</button>
    </form>
  );
}

export default CreateUserForm;
