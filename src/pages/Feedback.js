import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../componentes/Header';
import { savePontuation } from '../redux/actions';

const THREE = 3;

class Feedback extends React.Component {
  state = {
    message: '',
  }

 componentDidMount = () => {
   const { assertions } = this.props;
   console.log(assertions);
   if (assertions < THREE) {
     this.setState({ message: 'Could be better...' });
     console.log('log if');
   } else {
     this.setState({ message: 'Well Done!' });
     console.log('log else');
   }
 }

 componentWillUnmount = () => {
   const { dispatch } = this.props;
   dispatch(savePontuation({ assertions: 0, score: 0 }));
 }

 handleClick = () => {
   const { history } = this.props;
   history.push('/');
 }

 render() {
   const { message } = this.state;
   const { assertions, score, history } = this.props;
   return (
     <>
       <Header />
       <div className="feedback-conteiner">
         <div className="feedback-frases">
           <h1 data-testid="feedback-text">{ `You ${message}` }</h1>
           <h2 data-testid="feedback-total-score">
             { `Your score is ${Number(score)}` }
           </h2>
           <h2 data-testid="feedback-total-question">
             { `You have done ${assertions} hits` }
           </h2>
         </div>
         <div className="feedback-options">
           <button
             data-testid="btn-play-again"
             onClick={ this.handleClick }
             type="button"
           >
             Play Again
           </button>
           <button
             type="button"
             data-testid="btn-ranking"
             onClick={ () => { history.push('/ranking'); } }
           >
             Ranking
           </button>
         </div>
       </div>
     </>
   );
 }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Feedback);
