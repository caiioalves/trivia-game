import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../componentes/Header';
import { savePontuation } from '../redux/actions';
import { Box, Button, Container, Paper, Typography } from '@mui/material';

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
       <Box
         height='100vh'
         className="feedback-conteiner"
         display="flex"
         flexDirection="column"
         justifyContent="center"
         alignItems="center"
        >
        <Paper
         elevation={5}
          sx={{
            display: 'flex',
            padding: 3,
            minWidth: '60%',
            maxWidth: '90%',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 5,
            borderRadius: 4
          }}
        >
         <Box display="flex" flexDirection="column" alignItems="center" gap={2} className="feedback-frases">
           <Typography color='#217ed5' textAlign="center" fontWeight="bold" variant="h4" data-testid="feedback-text">{ `You ${message}` }</Typography>
           <Typography variant="h5" data-testid="feedback-total-score">
             { `Your score is ${Number(score)}` }
           </Typography>
           <Typography variant="h5" data-testid="feedback-total-question">
             { `You have done ${assertions} hits` }
           </Typography>
         </Box>
         <Box display="flex" flexDirection="column" gap={1} className="feedback-options">
           <Button
             color='secondary'
             sx={{ fontWeight: 'bold' }}
             variant='contained'
             data-testid="btn-play-again"
             onClick={ this.handleClick }
           >
             Play Again
           </Button>
           <Button
             sx={{ fontWeight: 'bold' }}
             variant='contained'
             data-testid="btn-ranking"
             onClick={ () => { history.push('/ranking'); } }
           >
             Ranking
           </Button>
         </Box>
         </Paper>
       </Box>
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
