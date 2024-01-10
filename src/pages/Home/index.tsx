import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ContactList } from "components/Contact";

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    // Fetch contacts from the API when the component mounts
    const fetchContacts = async () => {
      try {
        const response = await fetch("http://localhost:3005/contacts");
        if (!response.ok) {
          throw new Error("Failed to fetch contacts");
        }
        const data = await response.json();
        console.log(data);
        setContacts(data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchContacts();
  }, []);

  const handleOnAddContact = () => {
    navigate("/contacts/add");
  };

  return (
    <>
      <div className="flex justify-end">
        <button
          className="bg-primary-light text-light px-6 py-3 rounded-lg
            hover:bg-primary-1 transition-all duration-300
          "
          data-testid="add-contact"
          onClick={handleOnAddContact}
        >
          Add Contact
        </button>
      </div>
      <ContactList contacts={contacts} />
    </>
  );
};
