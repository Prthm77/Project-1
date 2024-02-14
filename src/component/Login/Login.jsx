// import { useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import Modal from 'react-bootstrap/Modal';
// import { useNavigate } from 'react-router-dom';
// import bcrypt from 'bcryptjs';
// import * as Yup from 'yup'; // Import Yup for validation

// const Login = () => {
//   const navigateTo = useNavigate();
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
//   const [errors, setErrors] = useState({});
//   const [showModal, setShowModal] = useState(false);

//   const validationSchema = Yup.object().shape({
//     email: Yup.string().required('Email is required').email('Invalid email address'),
//     password: Yup.string().required('Password is required')
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await validationSchema.validate(formData, { abortEarly: false });
      
//       const users = JSON.parse(localStorage.getItem('users')) || [];
//       const user = users.find(user => user.email === formData.email);

//       if (user) {
//         const passwordMatch = bcrypt.compareSync(formData.password, user.password);
//         if (passwordMatch) {
//           setShowModal(true);
//         } else {
//           setErrors({ password: 'Invalid email or password' });
//         }
//       } else {
//         setErrors({ email: 'User not found' });
//       }
//     } catch (error) {
//       const newErrors = {};
//       error.inner.forEach(err => {
//         newErrors[err.path] = err.message;
//       });
//       setErrors(newErrors);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//     // Reset error for the field being changed
//     setErrors({
//       ...errors,
//       [e.target.name]: ''
//     });
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//     console.log('Redirecting to Profile')
//     navigateTo('/profile');
//   };

//   return (
//     <>
//       <h1 className='form-title'>Login</h1>
      
// <div className='container form-container'>
//   <Form className='form-body' onSubmit={handleSubmit}>
//   <Form.Group className="mb-3" controlId="formBasicEmail">
//   <Form.Label>Email address</Form.Label>
//   <Form.Control 
//     type="email" 
//     name="email" 
//     value={formData.email} 
//     onChange={handleChange} 
//     placeholder="Enter email" 
//   />
//   {errors.email && <Form.Text className="text-danger">{errors.email}</Form.Text>}
// </Form.Group>

// <Form.Group className="mb-3" controlId="formBasicPassword">
//   <Form.Label>Password</Form.Label>
//   <Form.Control 
//     type="password" 
//     name="password" 
//     value={formData.password} 
//     onChange={handleChange} 
//     placeholder="Password" 
//   />
//   {errors.password && <Form.Text className="text-danger">{errors.password}</Form.Text>}
// </Form.Group>


//     <Button className="mx-1 form-btn" type="submit">
//       Login
//     </Button>
//   </Form>
//   {/* <p className=''> 
//     Don't have an Account? 
//     <Link to="/signup">Create Account</Link>
//   </p> */}
// </div>


//       <Modal show={showModal} onHide={handleCloseModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>Login Successful</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>You are successfully logged in!</Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleCloseModal}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// };

// export default Login;
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';
import * as Yup from 'yup'; // Import Yup for validation

const Login = () => {
  const navigateTo = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Invalid email address'),
    password: Yup.string().required('Password is required')
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      
      const signUpUsers = JSON.parse(localStorage.getItem('signUpUsers')) || [];
      const user = signUpUsers.find(user => user.email === formData.email);

      if (user) {
        const passwordMatch = bcrypt.compareSync(formData.password, user.password);
        if (passwordMatch) {
      
          localStorage.setItem('loggedInUser', JSON.stringify(user));
          
          localStorage.removeItem('signedUpUsers');
          setShowModal(true);
        } else {
          setErrors({ password: 'Invalid email or password' });
        }
      } else {
        setErrors({ email: 'User not found' });
      }
    } catch (error) {
      const newErrors = {};
      error.inner.forEach(err => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Reset error for the field being changed
    setErrors({
      ...errors,
      [e.target.name]: ''
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    console.log('Redirecting to Profile')
    navigateTo('/profile');
  };

  return (
    <>
      <h1 className='form-title'>Login</h1>
      
<div className='container form-container'>
  <Form className='form-body' onSubmit={handleSubmit}>
  <Form.Group className="mb-3" controlId="formBasicEmail">
  <Form.Label>Email address</Form.Label>
  <Form.Control 
    type="email" 
    name="email" 
    value={formData.email} 
    onChange={handleChange} 
    placeholder="Enter email" 
  />
  {errors.email && <Form.Text className="text-danger">{errors.email}</Form.Text>}
</Form.Group>

<Form.Group className="mb-3" controlId="formBasicPassword">
  <Form.Label>Password</Form.Label>
  <Form.Control 
    type="password" 
    name="password" 
    value={formData.password} 
    onChange={handleChange} 
    placeholder="Password" 
  />
  {errors.password && <Form.Text className="text-danger">{errors.password}</Form.Text>}
</Form.Group>


    <Button className="mx-1 form-btn" type="submit">
      Login
    </Button>
  </Form>
  {/* <p className=''> 
    Don't have an Account? 
    <Link to="/signup">Create Account</Link>
  </p> */}
</div>


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
