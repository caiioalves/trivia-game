import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { savePontuation } from '../redux/actions';
import { Box, Button, Container, Paper, Typography } from '@mui/material';
// import SvgIcon from '@mui/material/SvgIcon':
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

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
    colorRight: '#A4A6A6',
    colorWrong: '#A4A6A6'
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
      // console.log('setando o state dentro do setInterval');
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
    // console.log(this.state.questions);
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

    this.setState({ colorRight: '#A4A6A6' })
    this.setState({ colorWrong: '#A4A6A6' })

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
      colorRight,
      colorWrong
    } = this.state;
    return (
      <Container
        sx={{
          height: '100%',
          marginTop: 15,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // backgroundColor: "green"
        }}
      >
        { loading ? (
          <Paper
          elevation={5}
          sx={{
            marginTop: 2,
            borderRadius: 3,
            minWidth: "60%",
            // maxWidth: "90%",
            maxHeight: "1000vh",
            padding: 3,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            // alignItems: "center"
            // backgroundColor: "red"
          }}
          className="perguntas-respostas-container">
            <Box display="flex" flexDirection="column" className="perguntas">
              <Box mb={1} className="timer">
                <Typography variant='h5'>Timer: {timer}</Typography>
                {/* <Typography>{timer}</Typography> */}
              </Box>
              <Box display="flex" flexDirection="column" className="perguntas-container">
                <Typography fontWeight="bold" alignSelf="center" color='#217ed5' mb={2} variant='h4'>Question</Typography>
                <Typography fontWeight="bold" textAlign="center" alignSelf="center" mb={1} variant='h5' data-testid="question-category">{questions[index].category}</Typography>
                <Typography fontWeight="bold" textAlign="center" alignSelf="center" variant='h6' data-testid="question-text">{questions[index].question}</Typography>
                {console.log(questions[index].question)}
              </Box>
            </Box>
            <Box
              mt={2}
              gap={1}
              data-testid="answer-options"
              className="answer-options"
              alignSelf="center"
              display="flex"
              flexDirection="column"
              width='60%'
              justifyContent="center"
            >
              {arrayRandom.map((element, indice) => (
                element === questions[index]
                  .correct_answer ? (
                    <Button
                      fullWidth
                      variant="contained"
                      disabled={ disabled }
                      onClick={ (event) => {
                        this.handleClick(event, questions[index].difficulty)
                        this.setState({ colorRight: '#2BF08D' })
                        this.setState({ colorWrong: '#F25270' })
                        console.log('teste');
                      }}
                      id="rightAnswer"
                      className={ rightAnswer }
                      key={ indice }
                      data-testid="correct-answer"
                      sx={{bgcolor: colorRight, fontWeight: "bold"}}
                    >
                      {element}

                    </Button>)
                  : (
                    <Button
                      disabled={ disabled }
                      variant="contained"
                      data-testid={ `wrong-answer-${indice}` }
                      // type="button"
                      key={ indice }
                      onClick={(event) => {
                        this.handleClick(event)
                        this.setState({ colorRight: '#2BF08D' })
                        this.setState({ colorWrong: '#F25270' })
                      }
                      }
                      id="wrongAnswer"
                      className={ wrongAnswer }
                      sx={{bgcolor: colorWrong, fontWeight: "bold"}}
                    >
                      {element}
                    </Button>
                  )))}
                    {nextBtn && (
                      <Box mt={2} alignSelf="center" className="btn-next">
                        <Button
                          color='secondary'
                          name="next"
                          variant="contained"
                          type="button"
                          data-testid="btn-next"
                          onClick={ this.handleClickTwo }
                        >
                          {/* Next */}
                          <ArrowRightAltIcon sx={{ fontSize: 30 }}/>            
                        </Button>
                      </Box>
                    )}
              </Box> 
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
