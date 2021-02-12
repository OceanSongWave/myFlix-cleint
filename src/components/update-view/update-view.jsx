import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import axios from "axios";

import { Form, Button, Container, Row } from "react-bootstrap";

import "./update-view.scss";

export function UpdateView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const [usernameErr, setUsernameErr] = useState({});
  const [passwordErr, setPasswordErr] = useState({});
  const [emailErr, setEmailErr] = useState({});

  const handleUpdate = (e) => {
    e.preventDefault();

    const isValid = formValidation();

    const url =
      "https://star-flix-movieworld.herokuapp.com/users/" +
      localStorage.getItem("user");

    if (isValid) {
      axios
        .put(
          url,
          {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          const data = response.data;
          // console.log(data);
          localStorage.setItem("user", data.Username);
          // props.setUsername(data.Username);
          alert("Your profile was updated successfully");
          window.open("/", "_self");
        })
        .catch((e) => {
          console.log(e);
          alert("Username contains non alphanumeric characters - not allowed");
        });
    }
  };

  const formValidation = () => {
    const usernameErr = {};
    const passwordErr = {};
    const emailErr = {};
    let isValid = true;

    if (username.trim().length < 5) {
      usernameErr.usernameShort = "Username must be at least 5 characters";
      isValid = false;
    }

    if (password.trim().length < 1) {
      passwordErr.passwordMissing = "You must enter a password";
      isValid = false;
    }

    if (!email.includes(".") && !email.includes("@")) {
      emailErr.emailNotEmail = "A valid email address is required";
      isValid = false;
    }

    setUsernameErr(usernameErr);
    setPasswordErr(passwordErr);
    setEmailErr(emailErr);
    return isValid;
  };

  return (
    <Container className="update-view">
      <h2 style={{ textAlign: "center" }}>Update Your Account</h2>

      <Row className="justify-content-center">
        <Form className="update-form">
          <Form.Group controlId="formBasicUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              value={username}
              placeholder="Enter username"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
            {Object.keys(usernameErr).map((key) => {
              return (
                <div key={key} style={{ color: "red" }}>
                  {usernameErr[key]}
                </div>
              );
            })}
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              value={password}
              placeholder="Enter password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            {Object.keys(passwordErr).map((key) => {
              return (
                <div key={key} style={{ color: "red" }}>
                  {passwordErr[key]}
                </div>
              );
            })}
          </Form.Group>
          <Form.Group>
            <Form.Label>Birth Date:</Form.Label>
            <Form.Control
              type="date"
              value={birthday}
              placeholder="Select Birthday"
              required
              onChange={(e) => setBirthday(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              value={email}
              placeholder="name@example.com"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            {Object.keys(emailErr).map((key) => {
              return (
                <div key={key} style={{ color: "red" }}>
                  {emailErr[key]}
                </div>
              );
            })}
          </Form.Group>
        </Form>
      </Row>

      <Row className="justify-content-center">
        <Link to={`/users/`}>
          <Button
            className="update-button"
            variant="primary"
            type="submit"
            onClick={handleUpdate}
          >
            Update
          </Button>
        </Link>
      </Row>
    </Container>
  );
}

UpdateView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
    password: PropTypes.string,
    email: PropTypes.string,
    birthday: PropTypes.instanceOf(Date)
  })
}