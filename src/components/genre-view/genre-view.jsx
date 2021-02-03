import React from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './genre-view.scss';

import { Row, Container, Col, Card } from 'react-bootstrap';


export class GenreView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movies, movie } = this.props;

    if (!movie) return null;

    return (
      <Container className="wrapper container-fluid">
        <Row>
          <Col className="col-3" />
          <Col className="genre-view container-fluid align-items-center col-6">
            <div className="genre-title">
              <span className="label">Genre Name: </span>
              <span className="value">{movie.Genre.Name}</span>
            </div>
            <br />
            <div className="genre-description">
              <span className="label">Description: </span>
              <span className="value">{movie.Genre.Description}</span>
            </div>
            <br />
            <Link to={`/`}>
              <Button variant="info">Back to All Movies</Button>
            </Link>
          </Col>
          <Col className="col-3" />
        </Row>
      </Container >
    );
  }
}

GenreView.propTypes = {
  Movie: PropTypes.shape({
    Genre: {
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    },
  }),
};