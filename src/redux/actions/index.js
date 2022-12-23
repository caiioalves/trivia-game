/* import { redirectLogin } from '../../Pages/Settings'; */

export const LOGIN = 'LOGIN';

const addUser = (user) => ({
  type: LOGIN,
  payload: user,
});

export default addUser;

export const API = 'API';

export const sendApiResponse = (response) => ({
  type: API,
  payload: response,
});

export const POINTS = 'POINTS';

export const savePontuation = (points) => ({
  type: POINTS,
  payload: points,
});

export const HASH = 'HASH';

export const saveHash = (hash) => ({
  type: HASH,
  payload: hash,
});

export const fetchApiThunk = () => async (dispatch) => {
  // lógica requisição do token da api
  const urlToken = 'https://opentdb.com/api_token.php?command=request';
  const responseToken = await fetch(urlToken);
  const responseTokenJson = await responseToken.json();
  localStorage.setItem('token', responseTokenJson.token);
  const urlPerguntas = `https://opentdb.com/api.php?amount=5&token=${responseTokenJson.token}`;
  const responsePerguntas = await fetch(urlPerguntas);
  const responsePerguntasJson = await responsePerguntas.json();
  /*   const ERROR_CODE = 3; */
  if (responsePerguntasJson.response_code === 0) {
    dispatch(sendApiResponse(responsePerguntasJson.results));
    return responsePerguntasJson;
  }
/*   if (responsePerguntasJson.response_code === ERROR_CODE) {
    redirectLogin();
  } */
};
