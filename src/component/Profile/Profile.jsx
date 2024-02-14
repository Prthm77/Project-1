import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import bcrypt from "bcryptjs";
import "./Profile.css";

const Profile = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      setFormData(loggedInUser);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setFormErrors({
      ...formErrors,
      [e.target.name]: "", // Clear error message when user types in the input field
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm(formData);
    if (Object.keys(errors).length === 0) {
      const updatedUser = { ...formData };
      delete updatedUser.cpassword;

      const hashedPassword = bcrypt.hashSync(updatedUser.password, 10);
      updatedUser.password = hashedPassword;

      localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const updatedUsers = users.map((user) => {
        if (user.email === formData.email) {
          return updatedUser; // Update the current user with new data
        }
        return user;
      });
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      alert("Profile updated successfully!");
      setFormData({
        ...updatedUser,
        password: "",
        cpassword: "",
      });
    } else {
      setFormErrors(errors);
    }
  };

  const validateForm = (data) => {
    let errors = {};

    if (!data.fullName.trim()) {
      errors.fullName = "Full Name is required";
    }

    if (!data.email.trim()) {
      errors.email = "Email is required";
    } else if (!isValidEmail(data.email)) {
      errors.email = "Invalid email format";
    }

    if (!data.password.trim()) {
      errors.password = "Password is required";
    } else if (data.password.trim().length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }

    if (data.password !== data.cpassword) {
      errors.cpassword = "Passwords do not match";
    }

    return errors;
  };

  const isValidEmail = (email) => {
    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div>
      <h1 className="profile-title">Edit Profile</h1>
      <div className="container profile-container">
        <Form className="profile-body" onSubmit={handleSubmit}>
          <Form.Group controlId="formFullName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              isInvalid={!!formErrors.fullName}
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.fullName}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              isInvalid={!!formErrors.email}
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              isInvalid={!!formErrors.password}
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.password}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              name="cpassword"
              value={formData.cpassword}
              onChange={handleChange}
              isInvalid={!!formErrors.cpassword}
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.cpassword}
            </Form.Control.Feedback>
          </Form.Group>

          <Button className="profile-btn mt-3" type="submit">
            Update Profile
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Profile;
