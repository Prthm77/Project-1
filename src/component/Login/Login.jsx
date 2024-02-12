import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {
  const navigateTo = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);

    const users = JSON.parse(localStorage.getItem('users')) || [];
    console.log('Users:', users);

    const user = users.find(user => user.email === formData.email && user.password === formData.password);
    console.log('Found User:', user);

    if (user) {
      setError('');
      navigateTo('/profile');
    } else {
      setError('Invalid Info');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <h1 className='form-title'>Login</h1>
      <div className='container form-container '>
        <Form className='form-body' onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
          </Form.Group>

          <Button className="mx-1 form-btn" type="submit">
            Login
          </Button>

          {error && <p className="text-danger">{error}</p>}
        </Form>
      </div>
    </>
  );
};

export default Login;
