import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';
import * as Yup from 'yup';
import bcrypt from 'bcryptjs';

const SignUp = () => {
  const navigateTo = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    cpassword: ''
  });
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false); 

  const handleCloseModal = () => setShowModal(false); 

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Full Name is required'),
    email: Yup.string().required('Email is required').email('Invalid email address'),
    password: Yup.string().required('Password is Required').min(6, 'Password must be at least 6 characters'),
    cpassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  
    validationSchema.validate(formData, { abortEarly: false })
      .then(() => {
        // Check if email already exists
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const existingUser = users.find(user => user.email === formData.email);
        if (existingUser) {
          setErrors({ email: 'Email already exists' });
          return;
        }
  
        // Hash the password before storing
        const hashedPassword = bcrypt.hashSync(formData.password, 10);
  
        users.push({
          fullName: formData.fullName,
          email: formData.email,
          password: hashedPassword
        });
        localStorage.setItem('users', JSON.stringify(users));
        setShowModal(true);
        setFormData({
          fullName: '',
          email: '',
          password: '',
          cpassword: ''
        });

  
       
      })
      .catch((err) => {
        const newErrors = {};
        err.inner.forEach(error => {
          newErrors[error.path] = error.message;
        });
        setErrors(newErrors);
      });
  };
  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <h1 className="form-title">Sign Up</h1>
      <div className='container form-container'>
        <Form className='form-body' onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicFullName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Enter Full Name" />
            {errors.fullName && <span className="text-danger">{errors.fullName}</span>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter email" />
            {errors.email && <span className="text-danger">{errors.email}</span>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
            {errors.password && <span className="text-danger">{errors.password}</span>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" name="cpassword" value={formData.cpassword} onChange={handleChange} placeholder="Confirm Password" />
            {errors.cpassword && <span className="text-danger">{errors.cpassword}</span>}
          </Form.Group>

          <Button className="mx-1 form-btn" type="submit">
            Sign Up
          </Button>
        </Form>
      </div>

      {/* Modal for showing success message */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>User Created</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your account has been successfully created!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button className='form-btn' onClick={() => {
            navigateTo('/' , { state: { user: formData } }); 
            handleCloseModal();
          }}>
            Go to Profile
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SignUp;
