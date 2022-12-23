import React from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveHash } from '../redux/actions';

class Header extends React.Component {
    state = {
      url: '',
    }

  componentDidMount = () => {
    const { email, score, dispatch } = this.props;
    console.log(score);
    const hash = md5(email).toString();
    const url = `https://www.gravatar.com/avatar/${hash}`;
    dispatch(saveHash(url));
    this.setState({ url });
  }

  render() {
    const { nome, score } = this.props;
    console.log(score);
    const { url } = this.state;
    return (
      <header>
        <div className="picture-name-content">
          <img
            className="picture"
            src={ url }
            alt="imagem de Perfil"
            data-testid="header-profile-picture"
          />
          <h3 data-testid="header-player-name">{ nome }</h3>
        </div>
        <h3 className="score" data-testid="header-score">

          {`Score: ${score}`}

        </h3>
      </header>
    );
  }
}

Header.propTypes = {
  nome: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  nome: state.player.name,
  score: state.player.score,
});

export default connect(mapStateToProps, null)(Header);
