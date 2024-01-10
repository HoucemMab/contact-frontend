import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { IContact, FormStatus } from "types";
import styles from "./index.module.scss";

interface IContactListProps {
  contacts: Array<IContact>;
}

export const ContactList: React.FC<IContactListProps> = ({ contacts }) => {
  const navigate = useNavigate();

  const handleOnUpdate = (contactId: string) => {
    navigate(`/contacts/${contactId}`);
  };

  const handleOnDelete = async (contactId: string) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      try {
        const response = await fetch(
          `http://localhost:3005/contacts/${contactId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          // Successful deletion
          toast.success("Contact deleted successfully");
          // Optionally, you can refresh the contacts list or perform other actions
        } else {
          // Failed deletion
          toast.error("Failed to delete contact");
        }
      } catch (error) {
        console.error("Error deleting contact:", error);
        toast.error("Failed to delete contact");
      }
    }
  };

  return (
    <div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Age</th>
            <th>Website</th>
            <th>Tags</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact._id}>
              {/* Render your contact details */}
              <td>{/* Avatar */}</td>
              <td>
                {contact.name} {contact.lastName}
              </td>
              <td>{contact.email}</td>
              <td>{contact.phoneNumber}</td>
              <td>{contact.age}</td>
              <td>{contact.linkToWebsite}</td>
              <td>{contact.tags.join(", ")}</td>
              <td>
                <button onClick={() => handleOnUpdate(contact._id)}>
                  Update
                </button>
                <button onClick={() => handleOnDelete(contact._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {contacts.length === 0 && (
        <div className="text-center">
          No contacts found. Create a first one!
        </div>
      )}
      <ToastContainer />
    </div>
  );
};
