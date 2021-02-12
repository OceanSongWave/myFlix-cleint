import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './director-view.scss';

import { Button, Container, Col, Row, Card } from 'react-bootstrap';

export class DirectorView extends React.Component {

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
          <Col className="director-view container-fluid align-items-center col-6">
            <div className="director-title">
              <span className="label"></span>
              <span className="value">{movie.Director.Name}</span>
            </div>
            <br />
            <div className="director-bio">
              <span className="label"></span>
              <span className="value">{movie.Director.Bio}</span>
            </div>
            <br />
            <div className="director-birth">
              <span className="label">Birth Year:  </span>
              <span className="value">{movie.Director.Birth}</span>
            </div>
            <br />

            <Link to={`/`}>
              <Button variant="info">Back to All Movies</Button>
            </Link>
          </Col>
          <Col className="col-3" />
        </Row>
      </Container>
    );
  }
}

DirectorView.propTypes = {
  Movie: PropTypes.shape({
    Director: {
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
    },
  }),
};