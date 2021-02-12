import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route } from "react-router-dom";

import { setMovies } from '../../actions/actions';
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';

import MoviesList from '../movies-list/movies-list';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { ProfileView } from '../profile-view/profile-view';
import { UpdateView } from '../update-view/update-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';

import { Navbar, Nav, Container, Row, Col, Button } from 'react-bootstrap';

import logo from '../../img/logo.svg'

import './main-view.scss'

class MainView extends React.Component {
  constructor() {
    // Call the superclass constructor so React can initialize it
    super();

    // Initialize the state to an empty object so we can destructure it later
    this.state = {
      movies: [],
      user: null
    };
  }

  getMovies(token) {
    axios.get('https://star-flix-movieworld.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // Assign the result to the state
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // One of the "hooks" available in a React Component
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  /* When a movie is clicked this function is invoked and updates the state of the `selectedMovie` *property to that movie */
  // onMovieClick(movie) {
  //   this.setState({
  //     selectedMovie: movie
  //   });
  // }

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

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null,
    });
    console.log('logout successful');
    alert('You have been successfully logged out');
    window.open('/', '_self');
  }


  render() {
    // If the state isn't initialized, this will throw on runtime
    // before the data is initially loaded
    // const { movies, user } = this.state;

    let { movies, visibilityFilter } = this.props;
    let { user } = this.state;


    /* If there is no user, the LoginView is rendered.  If there is a user logged in, the user details are *passed as a prop to the LoginView */

    // Before the movies have been loaded

    // if (!movies) return <div className="main-view"/>;


    return (
      <Router>
        <div className="main-view">
          <Navbar
            bg="info"
            expand="lg"
            sticky="top"
            variant="dark"
            className="navbar shadow-sm mb-5"
          >
            <Navbar.Brand
              href="/"
            >
              <img
                src={logo}
                width="35"
                height="35"
                className="d-inline-block align-top"
                alt={logo}
              />{' '}
              StarFlix
          </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse
              className="justify-content-end"
              id="basic-navbar-nav"
            >
              {!user ? (
                <Nav className="mr-auto">
                  <Nav.Link href="/">Login</Nav.Link>
                  <Nav.Link href="/register">Join</Nav.Link>
                </Nav>
              ) : (
                  <Nav className="mr-auto">
                    <Nav.Link href="/users/${user}">My Account</Nav.Link>
                    <Nav.Link href="/">All Movies</Nav.Link>
                    <Nav.Link href="/" onClick={() => this.logOut()}>Log Out</Nav.Link>{' '}
                  </Nav>
                )}
              <VisibilityFilterInput visibilityFilter={visibilityFilter} />
            </Navbar.Collapse>

          </Navbar>

          <Route
            exact path="/"
            render={() => {
              if (!user)
                return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
              return <MoviesList movies={movies} />;
            }
            } />

          {/* return ( */}
          {/* <div className="row d-flex mt-4 ml-2"> */}
          {/* {movies.map(m => <MovieCard key={m._id} movie={m}/> */}
          {/* )} */}
          {/* </div> */}

          <Route
            path="/register"
            render={() => <RegistrationView />}
          />

          <Route
            exact
            path="/users/"
            render={() => window.open("/", "_self")}
          />

          <Route
            exact
            path="/users/:userId"
            render={() => <ProfileView movies={movies} />}
          />

          <Route
            path="/update/:userId"
            render={() => {
              return <UpdateView />;
            }}
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
        </div>
      </Router>
    );
  }
}


let mapStateToProps = state => {
  return { movies: state.movies }
}

// #4
export default connect(mapStateToProps, { setMovies })(MainView);