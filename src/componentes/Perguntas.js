import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { savePontuation } from '../redux/actions';
import { Box, Button, Container, Paper, Typography } from '@mui/material';

const ONE_SECOND = 1000;
const TEN = 10;
const THREE = 3;
const TWO = 2;
const ONE = 1;
const FOUR = 4;

class Perguntas extends React.Component {
  state = {
    index: 0,
    timer: 30,
    disabled: false,
    questions: [],
    arrayRandom: [],
    nextBtn: false,
    loading: false,
    rightAnswer: 'perguntas',
    wrongAnswer: 'perguntas',
  }

  getRandomAnswerAndQuestions = async () => {
    const tokenApi = localStorage.getItem('token');
    const { history } = this.props;
    const urlPerguntas = `https://opentdb.com/api.php?amount=5&token=${tokenApi}`;
    const responsePerguntas = await fetch(urlPerguntas);
    const responsePerguntasJson = await responsePerguntas.json();
    const ERROR_CODE = 3;
    if (responsePerguntasJson.response_code === ERROR_CODE) {
      localStorage.removeItem('token');
      history.push('/');
    } else {
      const { index } = this.state;
      const responseApi = responsePerguntasJson.results;
      const arrayAnswers = [...responseApi[index].incorrect_answers, responseApi[index]
        .correct_answer];
      const ALEATORIO = 0.5;
      const arrayAnswersRandom = arrayAnswers.sort(() => Math.random() - ALEATORIO);
      this.setState({
        questions: responseApi,
        arrayRandom: arrayAnswersRandom,
        loading: true,
      });
    }
  }

  timer = () => {
    this.intervalId = setInterval(() => {
      console.log('setando o state dentro do setInterval');
      this.setState((prevState) => ({ timer: prevState.timer - 1 }));
    }, ONE_SECOND);
  }

  componentDidMount = () => {
    this.timer();
    this.getRandomAnswerAndQuestions();
  }

  changeState = () => {
    this.setState({
      disabled: true,
      nextBtn: true,
    });
  }

  componentDidUpdate = () => {
    const { timer, disabled } = this.state;
    if (timer === 0 && disabled === false) {
      clearInterval(this.intervalId);
      this.changeState();
    }
  }

  handleClick = (event, difficulty) => {
    this.setState({ rightAnswer: 'rightAnswer' });
    this.setState({ wrongAnswer: 'wrongAnswer' });
    this.setState({ nextBtn: 'true' });

    clearInterval(this.intervalId);
    const { timer } = this.state;
    const { assertions, dispatch, score } = this.props;
    let difficultyPoints = 0;
    if (difficulty === 'hard') {
      difficultyPoints = THREE;
    } if (difficulty === 'medium') {
      difficultyPoints = TWO;
    } if (difficulty === 'easy') {
      difficultyPoints = ONE;
    }
    if (event.target.id === 'rightAnswer') {
      const pointsMade = TEN + (timer * difficultyPoints);
      const correctAmout = assertions + 1;
      const scoreTotal = score + pointsMade;
      dispatch(savePontuation({ assertions: correctAmout, score: scoreTotal }));
    }
  };

  handleClickTwo = () => {
    const { index } = this.state;
    if (index === FOUR) {
      const { history, score, name, hash } = this.props;
      console.log('deu certo');
      history.push('/feedback');
      const player = {
        score,
        name,
        hash,
      };
      let array = [];
      const lSitems = localStorage.getItem('playersRank');
      if (!lSitems) {
        array = [];
      } else {
        array = JSON.parse(lSitems);
      }
      localStorage.setItem('playersRank', JSON.stringify([...array, player]));
    } else {
      this.setState({
        index: index + 1,
        nextBtn: false,
        loading: false,
        rightAnswer: 'perguntas',
        wrongAnswer: 'perguntas',
        timer: 30,
        disabled: false,
      }, this.timer());
      this.getRandomAnswerAndQuestions();
    }
  }

  render() {
    const {
      questions,
      rightAnswer,
      wrongAnswer,
      index,
      timer,
      disabled,
      arrayRandom,
      nextBtn,
      loading,
    } = this.state;
    return (
      <Container
        sx={{
          marginTop: 15,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // backgroundColor: "green"
        }}
      >
        { loading ? (
          <Paper 
          sx={{
            // minWidth: "80%",
            // maxWidth: "90%",
            display: "flex",
            justifyContent: "center",
            // alignItems: "center"
            // backgroundColor: "red"
          }}
          className="perguntas-respostas-container">
            <Box className="perguntas">
              <Box className="timer">
                <Typography>Timer: </Typography>
                <Typography>{timer}</Typography>
              </Box>
              <Box className="perguntas-container">
                <Typography>Question</Typography>
                <Typography data-testid="question-category">{questions[index].category}</Typography>
                <Typography data-testid="question-text">{questions[index].question}</Typography>
              </Box>
            </Box>
            <Box data-testid="answer-options" className="answer-options">
              {arrayRandom.map((element, indice) => (
                element === questions[index]
                  .correct_answer ? (
                    <Button
                      variant="contained"
                      disabled={ disabled }
                      onClick={ (event) => this
                        .handleClick(event, questions[index].difficulty) }
                      id="rightAnswer"
                      className={ rightAnswer }
                      key={ indice }
                      data-testid="correct-answer"
                      type="button"
                    >
                      {element}

                    </Button>)
                  : (
                    <Button
                      disabled={ disabled }
                      variant="contained"
                      id="wrongAnswer"
                      className={ wrongAnswer }
                      data-testid={ `wrong-answer-${indice}` }
                      type="button"
                      key={ indice }
                      onClick={ this.handleClick }
                    >
                      {element}
                    </Button>
                  )))}
            </Box> 
                    {nextBtn && (
                      <Box className="btn-next">
                        <Button
                          name="next"
                          variant="contained"
                          type="button"
                          data-testid="btn-next"
                          onClick={ this.handleClickTwo }
                        >
                          Next
            
                        </Button>
                      </Box>
                    )}

          </Paper>
        ) : (
          <Typography>Carregando Pergunta..</Typography>
        )}
      </Container>
    );
  }
}

Perguntas.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  dispatch: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  hash: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
  name: state.player.name,
  hash: state.player.hash,
});

export default connect(mapStateToProps, null)(Perguntas);
