import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Form, Button, Container } from 'react-bootstrap';

import './login-view.scss';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [usernameErr, setUsernameErr] = useState({});
  const [passwordErr, setPasswordErr] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = formValidation();

    if (isValid) {
      /* Send a request to the server for authentication */
      axios.post('https://star-flix-movieworld.herokuapp.com/login', {
        Username: username,
        Password: password
      })
        .then(response => {
          const data = response.data;
          props.onLoggedIn(data);
        })
        .catch(e => {
          console.log('no such user')
          alert("Username contains non alphanumeric characters - not allowed");
        });
    };
  }

  const formValidation = () => {
    const usernameErr = {};
    const passwordErr = {};
    let isValid = true;

    if (username.trim().length < 5) {
      usernameErr.usernameShort = "Username must be at least 5 characters";
      isValid = false;
    }

    if (password.trim().length < 1) {
      passwordErr.passwordMissing = "You must enter a password";
      isValid = false;
    }

    setUsernameErr(usernameErr);
    setPasswordErr(passwordErr);
    return isValid;
  };

  return (
    <Container>
      <div className="login-heading">
        <h2>Welcome to StarFlix</h2>
      </div>
      <br />

      <Form>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            required
            placeholder="Enter Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <Form.Text className="text-muted"
          >Must be alphanumeric and contain at least 5 characters.
          </Form.Text>
        </Form.Group>


        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            className="form-field"
            type="password"
            required
            placeholder="Enter Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Form.Text className="text-muted"
          >Password is required.
          </Form.Text>
        </Form.Group>

        <Button
          className="login-button"
          type="submit"
          onClick={handleSubmit}
        >
          Sign In
          </Button>

        <br />
        <br />

        <Link to={`/register`}>
          <Button
            className="sign-up-button new-user"
            variant="secondary"
          >
            New User - Sign Up Here!
            </Button>
        </Link>
      </Form>
    </Container>
  )
}

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired,
};