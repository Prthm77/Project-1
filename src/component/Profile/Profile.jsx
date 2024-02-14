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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = { ...formData }; 
    delete updatedUser.cpassword; 


    const hashedPassword = bcrypt.hashSync(updatedUser.password, 10);
    updatedUser.password = hashedPassword;

    localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map(user => {
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
            />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              name="cpassword"
              value={formData.cpassword}
              onChange={handleChange}
            />
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
