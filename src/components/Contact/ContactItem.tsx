import React from 'react';
import { IContact } from 'types';
import { ReactComponent as EditIcon } from 'assets/edit.svg';
import { ReactComponent as TrashIcon } from 'assets/trash.svg';
import styles from './index.module.scss';

interface IContactItemProps {
  contact: IContact;
  onDelete: () => void;
  onUpdate: () => void;
}

export const ContactItem: React.FC<IContactItemProps> = ({ contact, onDelete, onUpdate }) => {
  return (
    <tr>
      <td>
        <img data-testid="contact-avatar" className={styles.avatar} src={contact.avatar} width="50" height="50" alt={`${contact.name} ${contact.lastName}`} />
      </td>
      <td>{contact.name} {contact.lastName}</td>
      <td>{contact.email}</td>
      <td>{contact.phoneNumber}</td>
      <td>{contact.age}</td>
      <td>
        {contact.linkToWebsite &&
          <a
            className="hover:underline hover:text-light-1"
            target="_blank"
            href={contact.linkToWebsite}
            rel="noreferrer"
          >
            Website
          </a>
        }
        {!contact.linkToWebsite && <span className="text-orange-700 text-sm">No Website Link</span>}
      </td>
      <td>{contact.tags}</td>
      <td>
        <div className="flex items-center px-2">
          <EditIcon data-testid="edit-icon" className={styles.editIcon} onClick={onUpdate} />
          <TrashIcon data-testid="delete-icon" className={styles.trashIcon} onClick={onDelete} />
        </div>
      </td>
    </tr>
  )
}