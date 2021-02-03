import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import { Link } from "react-router-dom";

import { Button, Container, Row, Col } from 'react-bootstrap';

import './movie-view.scss';

export class MovieView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  addFavorite(movie) {
    let token = localStorage.getItem("token");
    let url =
      "https://star-flix-movieworld.herokuapp.com/users/" +
      localStorage.getItem("user") +
      "/favorites/" +
      movie._id;

    console.log(token);

    axios
      .post(url, "", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        // window.open("/", "_self");
        window.open("/movies/" + movie._id, "_self");
        alert("Added to favorites!");
      });
  }


  render() {
    const { movie } = this.props;

    if (!movie) return null;

    return (
      <Container className="wrapper container-fluid">
        <Row>
          <Col className="col-3" />
          <div className="movie-view container-fluid align-items-center col-6">
            <img className="movie-poster" src={movie.ImagePath} />
            <div className="movie-title">
              <span className="label">Title: </span>
              <span className="value">{movie.Title}</span>
            </div>
            <br />
            <div className="movie-description">
              <span className="label">Description: </span>
              <span className="value">{movie.Description}</span>
            </div>
            <br />
            <div className="movie-genre">
              <span className="label">Genre: </span>
              <Link to={`/genres/${movie.Genre.Name}`}>
                <Button variant="link">{movie.Genre.Name}</Button>
              </Link>
            </div>
            <div className="movie-director">
              <span className="label">Director: </span>
              <Link to={`/directors/${movie.Director.Name}`}>
                <Button variant="link">{movie.Director.Name}</Button>
              </Link>
            </div>
            <br />
            <div>
              <Button
                variant="warning"
                size="sm"
                onClick={() => this.addFavorite(movie)}
              >
                Add Movie to Favorites
            </Button>
            </div>
            <br />
            <Link to={`/`}>
              <Button variant="info" size="sm">Back to All Movies</Button>
            </Link>
          </div>
          <Col className="col-3" />
        </Row>
      </Container>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      // Description: PropTypes.string.isRequired,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      // Bio: PropTypes.string.isRequired,
      // Birth: PropTypes.string.isRequired,
      // Death: PropTypes.string,
    }),
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};