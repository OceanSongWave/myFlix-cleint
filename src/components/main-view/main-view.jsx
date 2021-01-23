import React from 'react';
import axios from 'axios';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export class MainView extends React.Component {
  constructor() {
    // Call the superclass constructor
    // so React can initialize it
    super();

    // Initialize the state to an empty object so we can destructure it later
    this.state = {
      movies: null,
      selectedMovie: null,
      user: null
    };
  }

  componentDidMount() {
    axios.get('https://star-flix-movieworld.herokuapp.com/movies')
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

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  // onRegister(register) {
  //   this.setState({
  //     register,
  //   });
  // }

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

    /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    /* Register */
    // if (!register)
    //   return (
    //     <RegistrationView onRegister={(register) => this.onRegister(register)} />
    //   );

    // Before the movies have been loaded
    if (!movies) return <div className="main-view" />;

    return (
      <Row className="main-view justify-content-md-center">
        {selectedMovie
          ? (
            <Col md={8} style={{ border: '1px solid black' }}>
              <MovieView movie={selectedMovie} onBackClick={movie => this.onMovieClick(null)} />
            </Col>
          )
          : movies.map(movie => (
            <Col md={3}>
              <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)} />
            </Col>
          ))
        }
      </Row>
    );
  }
}