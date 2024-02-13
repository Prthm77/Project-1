import  { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs'; 

const Login = () => {
  const navigateTo = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === formData.email);

    if (user) {
    
      const passwordMatch = bcrypt.compareSync(formData.password, user.password);
      if (passwordMatch) {
        setError('');
        setShowModal(true);
      } else {
        setError('Invalid email or password');
      }
    } else {
      setError('User not found');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigateTo('/');
  };

  return (
    <>
      <h1 className='form-title'>Login</h1>
      <div className='container form-container'>
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

      {/* Modal for showing success message */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Login Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>You are successfully logged in!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Login;
