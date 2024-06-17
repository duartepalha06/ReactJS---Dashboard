// InnerCollapsible.js
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import "./collapsibleStyles.css";

const InnerCollapsible = ({
  label,
  value,
  onEditClick,
  isEditing,
  onSave,
  onCancel,
  onChange,
  isId,
}) => {
  const [isActive, setIsActive] = useState(false);

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="inner-collapsible-container">
      <button
        type="button"
        className={`inner-collapsible ${isActive ? "active" : ""}`}
        onClick={handleToggle}
      >
        {label}
      </button>
      <div className={`inner-content ${isActive ? "active" : ""}`}>
        {!isEditing || isId ? (
          <>
            <span>{value}</span>
            {!isId && (
              <FontAwesomeIcon
                icon={faEdit}
                className="edit-icon"
                onClick={onEditClick}
              />
            )}
          </>
        ) : (
          <>
            <input
              type={label === "User Email" ? "email" : "text"}
              value={value}
              onChange={onChange}
            />
            <div className="button-group">
              <button className="button-save" type="button" onClick={onSave}>
                Save
              </button>
              <button className="button-cancel" type="button" onClick={onCancel}>
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default InnerCollapsible;
