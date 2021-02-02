import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './registration-view.scss';

import { Form, Button, Container } from 'react-bootstrap';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const [usernameErr, setUsernameErr] = useState({});
  const [passwordErr, setPasswordErr] = useState({});
  const [emailErr, setEmailErr] = useState({});

  const handleRegister = (e) => {
    e.preventDefault();

    const isValid = formValidation();

    if (isValid) {
      axios.post('https://star-flix-movieworld.herokuapp.com/users', {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      })
        .then(response => {
          const data = response.data;
          console.log(data);
          window.open('/', '_self'); // '_self' is necessary so the page will open in the current tab
          alert('You may now log in');
        })
        .catch(e => {
          console.log('error registering the user')
        });
    };
  }

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
    <Container>
      <div className="register-heading">
        <h2>Create an account</h2>
      </div>
      <br />
      <Form className="registration-form">
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Pick a Username: </Form.Label>
          <Form.Control
            className="form-field"
            type="text"
            placeholder="Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Form.Text
            className="text-muted"
          >Must be alphanumeric and contain at least 5 characters.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Choose a Password: </Form.Label>
          <Form.Control
            className="form-field"
            type="text"
            placeholder="Password"
            required
            value-={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Form.Text
            className="text-muted"
          >Password is required.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Enter Email Address: </Form.Label>
          <Form.Control
            className="form-field"
            type="text"
            placeholder="example@gmail.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text
            className="text-muted"
          >Must be a valid email address.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicBirthday">
          <Form.Label>Enter Date of Birth:</Form.Label>
          <Form.Control
            className="form-field"
            type="date"
            placeholder="MM/DD/YYYY"
            required
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />
        </Form.Group>

        <Button type="submit"
          variant="primary"
          className="sign-in-button"
          onClick={handleRegister}
        >
          Submit
        </Button>

        <br />
        <br />

        <div className="current-user">
          Already have an account?
        </div>
        <Link to={`/`}>
          <Button
            variant="secondary"
            className="login-button existing-user"
          >
            Existing User - Log In
          </Button>
        </Link>
      </Form>
    </Container>
  )
};

RegistrationView.propTypes = {
  register: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    confirmPassword: PropTypes.string.isRequired,
    birthday: PropTypes.string.isRequired,
  }),
};