import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import React, { useState, ChangeEvent } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/config';
import'./Register.css'

interface User {
  id: number;
  displayName: string;
  username: string;
  password: string;
  email: string;
}

const RegistrationForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<User>({
    id: 0,
    displayName: '',
    username: '',
    password: '',
    email: '',
  });

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleRegistration = async (): Promise<void> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;
      if (user) {
        await updateProfile(user, {
          displayName: formData.displayName,
        });
      }
      navigate('/');
    
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='register-container'>
      <h2>Registration</h2>
      <Form>
      <Form.Group id='register-formGroup' controlId="username">
        <Form.Label>username:</Form.Label>
        <Form.Control
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
        />
      </Form.Group>

        <Form.Group id='register-formGroup' controlId="displayName">
          <Form.Label>Display Name:</Form.Label>
          <Form.Control
            type="text"
            name="displayName"
            value={formData.displayName}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group id='register-formGroup' controlId="email">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group id='register-formGroup' controlId="password">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Button variant="dark" onClick={handleRegistration}>
          Register
        </Button>
      </Form>
    </div>
  );
};

export default RegistrationForm;
