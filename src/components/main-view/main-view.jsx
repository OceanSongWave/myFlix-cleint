import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { BrowserRouter as Router, Route } from "react-router-dom";

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { ProfileView } from '../profile-view/profile-view';

import { Row, Col } from 'react-bootstrap';

import './main-view.scss'

export class MainView extends React.Component {
  constructor() {
    // Call the superclass constructor
    // so React can initialize it
    super();

    // Initialize the state to an empty object so we can destructure it later
    this.state = {
      movies: [],
      selectedMovie: '',
      user: ''
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  getMovies(token) {
    axios.get('https://star-flix-movieworld.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  onRegister(register) {
    this.setState({
      register,
    });
  }

  /* When back button click selectedMovie will set on it's initial state*/
  setInititalState() {
    this.setState({
      selectedMovie: null,
    });
  }

  // This overrides the render() method of the superclass
  // No need to call super() though, as it does nothing by default
  render() {
    // If the state isn't initialized, this will throw on runtime
    // before the data is initially loaded
    const { movies, selectedMovie, user, register } = this.state;


    return (
      <Router>
        <Route
          exact path="/"
          render={() => {
            if (!user)
              return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
            return movies.map(m => <MovieCard key={m._id} movie={m} />)
          }
          } />

        <Route
          path="/register"
          render={() => <RegistrationView />}
        />

        <Route
          exact
          path="/users/:userId"
          render={() => <ProfileView movies={movies} />}
        />

        <Route
          path="/movies/:movieId"
          render={({ match }) => (
            <MovieView
              movie={movies.find((m) => m._id === match.params.movieId)}
            />
          )}
        />

        <Route
          path="/genres/:name"
          render={({ match }) => (
            <GenreView
              movie={movies.find(
                (m) => m.Genre.Name === match.params.name
              )}
              movies={movies}
            />
          )}
        />

        <Route
          path="/directors/:name"
          render={({ match }) => (
            <DirectorView
              movie={movies.find(
                (m) => m.Director.Name === match.params.name
              )}
              movies={movies}
            />
          )}
        />

      </Router>
    );
  }
}