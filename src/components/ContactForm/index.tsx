import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { IContact, FormStatus } from "types";
import { useAppSelector, useAppDispatch } from "store/hooks";
import {
  addContact,
  updateContact,
  updateFormStatus,
} from "store/contact/slice";
import { fileToDataUrl } from "utils";
import "react-toastify/dist/ReactToastify.css";

interface IContactFormProps {
  contact?: IContact;
}

interface FormData {
  name: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  age: number;
  linkToWebsite: string;
  tags: string;
}

export const ContactForm: React.FC<IContactFormProps> = ({ contact }) => {
  const navigate = useNavigate();
  const [avatarFile, setAvatarFile] = useState<File>();
  const [avatarUrl, setAvatarUrl] = useState(contact?.avatar);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    age: 0,
    linkToWebsite: "",
    tags: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleOnSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setAvatarFile(e.target.files[0]);
      fileToDataUrl(e.target.files[0]).then((dataUrl) => setAvatarUrl(dataUrl));
    }
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await fetch("http://localhost:3005/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Data submitted successfully:", responseData);
        window.location.href = "/";
        // Dispatch actions or perform any other necessary logic
      } else {
        console.error("Failed to submit data");
        // Dispatch actions or perform error handling
      }
    } catch (error) {
      console.error("Error during data submission:", error);
      // Dispatch actions or perform error handling
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <form onSubmit={handleOnSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            data-testid="input-name"
            type="text"
            name="name"
            onChange={handleInputChange}
            required
            maxLength={50}
          />
        </div>

        <div className="form-group">
          <label>Last Name</label>
          <input
            data-testid="input-lastName"
            type="text"
            name="lastName"
            onChange={handleInputChange}
            required
            maxLength={50}
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            data-testid="input-email"
            type="text"
            name="email"
            onChange={handleInputChange}
            required
            maxLength={50}
          />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input
            data-testid="input-phoneNumber"
            type="text"
            name="phoneNumber"
            onChange={handleInputChange}
            required
            maxLength={15}
          />
        </div>

        <div className="form-group">
          <label>Age</label>
          <input
            data-testid="input-age"
            type="number"
            name="age"
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Avatar</label>
          {avatarUrl && (
            <img
              data-testid="img-avatar"
              className=""
              src={avatarUrl}
              width="100"
              height="100"
              alt="Avatar"
            />
          )}
          <input
            data-testid="input-avatarFile"
            className="text-light px-0"
            type="file"
            name="avatarFile"
            onChange={handleOnSelectFile}
          />
        </div>

        <div className="form-group">
          <label>Link To Website</label>
          <input
            data-testid="input-linkToWebsite"
            type="text"
            name="linkToWebsite"
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Tags</label>
          <textarea
            data-testid="input-tags"
            name="tags"
            onChange={handleInputChange}
          ></textarea>
        </div>

        <div className="flex justify-center">
          <button className="button" type="submit">
            Submit
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};
