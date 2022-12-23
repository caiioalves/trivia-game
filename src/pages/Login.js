import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import addUser, { fetchApiThunk } from '../redux/actions';
// import imagem from '../imagem/imagem.png';
import { Box, Button, Paper, Stack, TextField, Typography } from '@mui/material';
// import { useNavigate  } from 'react-router-dom';

class Login extends React.Component {
  state = {
    name: '',
    email: '',
    disable: true,
    // conditionalRender: false,
  }
  
    handleClick = async () => {
      const { dispatch, history } = this.props;
      const { email, name} = this.state;
      const info = { email, nome: name };
      await dispatch(fetchApiThunk());
      dispatch(addUser(info));
      history.push('/play');
    }

    handleClickSettings = () => {
      const { history } = this.props;
      history.push('/settings');
    }

    isButtonEnabled = () => {
      const { name, email } = this.state;
      const disable = [name !== '', email !== ''];
      // console.log(disable);
      const isDisable = disable.every((element) => element === true);
      this.setState({ disable: !isDisable });
    }

    handleChange = ({ target }) => {
      const { name, value } = target;
      // console.log(name, value);
      this.setState({ [name]: value }, this.isButtonEnabled);
    }

    render() {
      const { disable } = this.state;
      return (
        <Stack
          height="100vh"
          justifyContent="center"
          alignItems="center"
          // bgcolor="red"s
          // sx={{display:"flex", justifyContent: "center", alignItems: "center"}}
          className="login-content"
        >
          <Paper
            elevation={3}
            className="container-login"
            sx={{
              padding: "5%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: "5%"
            }}
          >
            <Typography
              component="h1"
              variant="h5"
              color="primary"
              fontWeight="bold"
              sx={{ textDecoration: "underline", mb: 6 }}
            >
          Sign-In
        </Typography>
            {/* <img alt="trivia" src={ imagem } className="img" /> */}
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <TextField 
                sx={{ mb: 2, width: "100%"}}
                name="name"
                label="Nome"
                data-testid="input-player-name"
                onChange={ this.handleChange }
              />
              <TextField
                name="email"
                label="Email"
                data-testid="input-gravatar-email"
                type="email"
                onChange={ this.handleChange }
              />
            </Box>
            <Box display="flex" flexDirection="column">
            <Button
              sx={{mt: 4, mb: 2}}
              variant="contained"
              onClick={ this.handleClick }
              data-testid="btn-play"
              disabled={ disable }
            >
              Play
            </Button>
            <Button
              variant="contained"
              onClick={ this.handleClickSettings }
              data-testid="btn-settings"
            >
              Settings
            </Button>
            </Box>
          </Paper>
        </Stack>
      );
    }
}

const mapStateToProps = (state) => ({
  email: state.player.respostas,
});

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Login);
