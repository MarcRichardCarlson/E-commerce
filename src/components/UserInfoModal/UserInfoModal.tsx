import React, { useState } from 'react';
import { User as FirebaseUser } from '@firebase/auth'; // Import Firebase's User interface
import './UserInfoModal.css';

interface UserInfoModalProps {
  user: FirebaseUser | null; // Use Firebase's User interface
  onClose: () => void;
  isOpen: boolean;
}

const UserInfoModal: React.FC<UserInfoModalProps> = ({ user, isOpen }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  if (!user) {
    return null;
  }

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={`modal ${isOpen ? 'is-active' : ''}`}>
      <div className="modal-background" onClick={closeModal}></div>
      <div className="modal-content">
        <div className="box">
          <button className="modal-close is-large" aria-label="close" onClick={closeModal}></button>
          <h3 className="title is-3">User Information</h3>
          <p><strong>Name:</strong> {user.displayName}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default UserInfoModal;
