import {http} from '../../helpers/http';
import {REACT_APP_BASE_URL} from '@env';

//pegawai
export const getAbsentById = (token, month, page) => async dispatch => {
  try {
    const {data} = await http(token).get(
      `${REACT_APP_BASE_URL}/absent/search?month=${month}&page=${page}`,
    );
    dispatch({
      type: 'GET_ABSENT_BY_ID',
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: 'GET_ABSENT_BY_ID_FAILED',
      payload: err.response.data.message,
    });
  }
};

export const absent = (token, type, date) => async dispatch => {
  const form = new URLSearchParams();
  form.append('date', date);
  try {
    const {data} = await http(token).post(
      `${REACT_APP_BASE_URL}/absent/input?type=${type}`,
      form.toString(),
    );
    dispatch({
      type: 'ABSENT',
      payload: data.message,
    });
  } catch (err) {
    dispatch({
      type: 'ABSENT_FAILED',
      payload: err.response.data.message,
    });
  }
};

//manajer
export const getAbsentAllPegawai = (token, month, page) => async dispatch => {
  try {
    const {data} = await http(token).get(
      `${REACT_APP_BASE_URL}/absent/pegawai?month=${month}&page=${page}`,
    );
    dispatch({
      type: 'GET_ABSENT_ALL_PEGAWAI',
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: 'GET_ABSENT_ALL_PEGAWAI_FAILED',
      payload: err.response.data.message,
    });
  }
};

export const deleteAbsent = (token, id) => async dispatch => {
  try {
    const {data} = await http(token).delete(
      `${REACT_APP_BASE_URL}/absent/pegawai/${id}`,
    );
    dispatch({
      type: 'DELETE_ABSENT',
      payload: data.message,
    });
  } catch (err) {
    dispatch({
      type: 'DELETE_ABSENT_FAILED',
      payload: err.response.data.message,
    });
  }
};
