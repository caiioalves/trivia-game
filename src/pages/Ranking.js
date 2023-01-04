// ordernação de objetos no array https://www.javascripttutorial.net/array/javascript-sort-an-array-of-objects/
import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Box, Button, List, ListItem, Paper, Typography } from '@mui/material';

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
      <Box height="100%" display="flex" alignItems="center" justifyContent="center" className="ranking-container">
        <Paper
          elevation={5}
          sx={{
            mt: 5,
            mb: 5,
            // minHeight: '30%',
            // height: "70%",
            padding: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: '50%',
            maxWidth: '90%',
            borderRadius: 4
          }}
        >
        <Typography color="#217ed5" fontWeight="bold" variant='h3' data-testid="ranking-title">Ranking</Typography>
        <List
          sx={{
            width:'100%',
          }}
        >
          { arrayRank.map((player, index) => (
            <ListItem
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignContent: 'center',

              }}
              key={ index }>
              <Box
                justifyContent="space-between"
                width="100%"
                display="flex"
                flexDirection="column"
                gap={1}
                alignItems="center"
                bgcolor='#F25270'
                color='white'
                borderRadius={3}
                padding={1}
                className="picture-name-content"
              >
                <Box display="flex" alignItems="center" gap={1}>
                <Avatar alt="account icon" className="picture" src={ player.hash } />
                <Typography fontWeight="bold" variant="h5" data-testid={ `player-name-${index}` }>{ player.name }</Typography>
                </Box>
                <Typography variant="h6" data-testid={ `player-score-${index}` }>
                  { `Your score is ${player.score}` }
                </Typography>
              </Box>
            </ListItem>
          )) }
        </List>
        <Button
          sx={{fontWeight: "bold"}}
          variant='contained'
          data-testid="btn-go-home"
          color='secondary'
          onClick={ this.handleClick }
        >
          Voltar ao inicio
        </Button>
        </Paper>
      </Box>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Ranking;
