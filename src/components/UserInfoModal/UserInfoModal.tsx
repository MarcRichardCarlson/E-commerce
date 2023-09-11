import React from 'react';
import { User as FirebaseUser } from '@firebase/auth'; // Import Firebase's User interface

interface UserInfoModalProps {
  user: FirebaseUser | null; // Use Firebase's User interface
  onClose: () => void;
  isOpen: boolean;
}

const UserInfoModal: React.FC<UserInfoModalProps> = ({ user, onClose, isOpen }) => {
  if (!user) {
    return null;
  }

  return (
    <div className={`modal ${isOpen ? 'is-active' : ''}`}>
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-content">
        <div className="box">
          <h3 className="title is-3">User Information</h3>
          <p><strong>Name:</strong> {user.displayName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          {/* Add more user information as needed */}
        </div>
      </div>
      <button className="modal-close is-large" aria-label="close" onClick={onClose}></button>
    </div>
  );
};

export default UserInfoModal;
