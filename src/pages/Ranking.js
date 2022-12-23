// ordernação de objetos no array https://www.javascripttutorial.net/array/javascript-sort-an-array-of-objects/
import React from 'react';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  state = {
    arrayRank: [],
  };

  handleClick = () => {
    const { history } = this.props;
    history.push('/');
  }

  componentDidMount = () => {
    const arrayRank = JSON.parse(localStorage.getItem('playersRank'));
    arrayRank.sort((a, b) => b.score - a.score);
    this.setState({ arrayRank });
  }

  render() {
    const { arrayRank } = this.state;
    return (
      <div className="ranking-container">
        <h1 data-testid="ranking-title">Ranking</h1>
        <ol>
          { arrayRank.map((player, index) => (
            <li key={ index }>
              <div className="picture-name-content">
                <img alt="account icon" className="picture" src={ player.hash } />
                <p data-testid={ `player-name-${index}` }>{ player.name }</p>
                <p data-testid={ `player-score-${index}` }>
                  { `your score is ${player.score}` }
                </p>
              </div>
            </li>
          )) }
        </ol>
        <button
          data-testid="btn-go-home"
          type="button"
          onClick={ this.handleClick }
        >
          Voltar ao inicio
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Ranking;
