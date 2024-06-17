// Collapsible.js
import React, { useState } from "react";
import axios from "axios";
import InnerCollapsible from "./InnerCollapsible";
import "./collapsibleStyles.css";

const Collapsible = ({
  title,
  user,
  isActive,
  onClick,
  position,
  setUsers,
  setRandomNumberCounts,
}) => {
  const [editingName, setEditingName] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  const [editingRandomNumber, setEditingRandomNumber] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [randomNumber, setRandomNumber] = useState(user.RandomNumber);

  const handleEditName = () => {
    setEditingName(true);
    setEditingEmail(false);
    setEditingRandomNumber(false);
  };

  const handleEditEmail = () => {
    setEditingEmail(true);
    setEditingName(false);
    setEditingRandomNumber(false);
  };

  const handleEditRandomNumber = () => {
    setEditingRandomNumber(true);
    setEditingName(false);
    setEditingEmail(false);
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:1000/api/users/${user._id}`, {
        name,
        email,
        position: user.position,
        RandomNumber: randomNumber,
      });
      setEditingName(false);
      setEditingEmail(false);
      setEditingRandomNumber(false);
      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u._id === user._id ? { ...u, name, email, RandomNumber: randomNumber } : u
        )
      );
      const counts = [0, 0, 0, 0, 0];
      setUsers.forEach((u) => {
        counts[u.RandomNumber - 1]++;
      });
      setRandomNumberCounts(counts);
      onClick();
    } catch (error) {
      console.error("Error updating user: ", error);
    }
  };

  const handleCancel = () => {
    setName(user.name);
    setEmail(user.email);
    setRandomNumber(user.RandomNumber);
    setEditingName(false);
    setEditingEmail(false);
    setEditingRandomNumber(false);
  };

  return (
    <div className={`collapsible-container ${position}`}>
      <button
        type="button"
        className={`collapsible ${isActive ? "active" : ""}`}
        onClick={onClick}
      >
        {title}
      </button>
      <div className={`content ${isActive ? "active" : ""}`}>
        <InnerCollapsible
          label="User ID"
          value={user._id}
          isId={true}
        />
        <InnerCollapsible
          label="User Name"
          value={name}
          isEditing={editingName}
          onEditClick={handleEditName}
          onSave={handleSave}
          onCancel={handleCancel}
          onChange={(e) => setName(e.target.value)}
        />
        <InnerCollapsible
          label="User Email"
          value={email}
          isEditing={editingEmail}
          onEditClick={handleEditEmail}
          onSave={handleSave}
          onCancel={handleCancel}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InnerCollapsible
          label="RandomNumber"
          value={randomNumber}
          isEditing={editingRandomNumber}
          onEditClick={handleEditRandomNumber}
          onSave={handleSave}
          onCancel={handleCancel}
          onChange={(e) => setRandomNumber(Number(e.target.value))}
        />
      </div>
    </div>
  );
};

export default Collapsible;
