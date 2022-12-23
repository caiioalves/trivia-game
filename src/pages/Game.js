import React from 'react';
import { PropTypes } from 'prop-types';
import Header from '../componentes/Header';
import Perguntas from '../componentes/Perguntas';

class Play extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <div id="play">
        <Header />
        <Perguntas history={ history } />
      </div>
    );
  }
}

Play.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Play;
