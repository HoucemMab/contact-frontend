import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { IContact, FormStatus } from 'types';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { deleteContact, updateFormStatus } from 'store/contact/slice';
import { ContactItem } from './ContactItem';
import styles from './index.module.scss';

interface IContactListProps {
  contacts: Array<IContact>;
}


export const ContactList: React.FC<IContactListProps> = ({ contacts }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const requestStatus = useAppSelector(state => state.contacts.formStatus);

  useEffect(() => {
    if (requestStatus === FormStatus.SUCCESS) {
      dispatch(updateFormStatus(FormStatus.NONE));
      toast.success('Deleted');
    } else if (requestStatus === FormStatus.FAILURE) {
      dispatch(updateFormStatus(FormStatus.NONE));
      toast.error('Failed to delete contact');
    }

    return () => { }
  }, [requestStatus, dispatch]);


  const handleOnUpdate = (idx: number) => {
    navigate(`/contacts/${idx}`)
  }

  const handleOnDelete = (idx: number) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      dispatch(deleteContact(idx));
    }
  }

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
          {
            contacts.map((contact) =>
              <ContactItem
                key={contact.id}
                contact={contact}
                onUpdate={() => handleOnUpdate(contact.id)}
                onDelete={() => handleOnDelete(contact.id)} />)
          }
        </tbody>
      </table>
      {
        contacts.length === 0 && (
          <div className="text-center">
            No contacts found. Create a first one!
          </div>
        )
      }
      <ToastContainer />
    </div>
  )
}
