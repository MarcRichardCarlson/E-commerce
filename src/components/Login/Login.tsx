import React, { useState } from 'react'
import'./Login.css'
import { Button, Form } from 'react-bootstrap';
import productsService from '../../Utils/productService';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();


    const toRegisterPage = () => {
        navigate('/register')
    }

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await productsService.loginUser(formData.email, formData.password);
      navigate('/');
      console.log('User logged in successfully');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group id='login-formGroup' controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group id='login-formGroup' controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <div className='login-btns'>
          <Button variant="dark" type="submit">
            Login
          </Button>
          <Button variant="link" className='register-btn' onClick={toRegisterPage}>Register</Button>
        </div>
      </Form>
    </div>
  );
};

export default LoginPage;
