import {http} from '../../helpers/http';
import {REACT_APP_BASE_URL} from '@env';

export const getUserById = token => async dispatch => {
  try {
    const {data} = await http(token).get(`${REACT_APP_BASE_URL}/user/profile`);
    dispatch({
      type: 'GET_USER_BY_ID',
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: 'GET_USER_BY_ID_FAILED',
      payload: err.response.data.message,
    });
  }
};

export const changePass =
  (token, password, newPassword) => async dispatch => {
    console.log(REACT_APP_BASE_URL);
    const form = new URLSearchParams();
    form.append('password', password);
    form.append('newPassword', newPassword);
    try {
      const {data} = await http(token).put(
        `${REACT_APP_BASE_URL}/user/profile/change_password`,
        form.toString(),
      );
      dispatch({
        type: 'CHANGE_PASSWORD',
        payload: data.message,
      });
    } catch (err) {
      dispatch({
        type: 'CHANGE_PASSWORD_FAILED',
        payload: err.response.data.message,
      });
    }
  };

export const changeUser = (token, Data) => async dispatch => {
  console.log(REACT_APP_BASE_URL);
  console.log(token, Data);
  const form = new FormData();
  if (Data.photo !== undefined) {
    form.append('photo', {
      uri: Data.photo.uri,
      name: Data.photo.fileName,
      type: Data.photo.type,
    });
  }
  form.append('name', Data.name);
  form.append('email', Data.email);
  form.append('birth_date', Data.birth_date);
  console.log(form);
  try {
    const {data} = await http(token).patch(`${REACT_APP_BASE_URL}/user/profile`, form);
    dispatch({
      type: 'CHANGE_USER',
      payload: data.message,
    });
  } catch (err) {
    dispatch({
      type: 'CHANGE_USER_FAILED',
      payload: err.response.data.message,
    });
  }
};