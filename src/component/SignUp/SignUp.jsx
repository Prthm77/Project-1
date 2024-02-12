import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useNavigate} from 'react-router-dom'
import './SignUp.css'
import * as Yup from 'yup';
import { useState } from 'react';

const SignUp = () => { // Ensure that history is passed as a prop
const navigateTo = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    cpassword: ''
  });

  const [errors, setErrors] = useState({});

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Full Name is required'),
    email: Yup.string().required('Email is required').email('Invalid email address'),
    password: Yup.string().required('Password is Required').min(6, 'Password must be at least 6 characters'),
    cpassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted');

    validationSchema.validate(formData, { abortEarly: false })
      .then(() => {
        console.log('Validation successful');
        // Check if email already exists
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const existingUser = users.find(user => user.email === formData.email);
        if (existingUser) {
          setErrors({ email: 'Email already exists' });
          return;
        }

        users.push(formData);
        localStorage.setItem('users', JSON.stringify(users));
        console.log('Form data stored in localStorage');

        // Redirect to the product page
        navigateTo('/product');
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
  }

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
    </>
  )
}

export default SignUp;
