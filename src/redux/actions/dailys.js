import {http} from '../../helpers/http';
import {REACT_APP_BASE_URL} from '@env';

//pegawai
export const getDailyByIdAndMonth = (token, month, page) => async dispatch => {
  try {
    const {data} = await http(token).get(
      `${REACT_APP_BASE_URL}/daily/search?month=${month}&page=${page}`,
    );
    dispatch({
      type: 'GET_DAILY_BY_ID',
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: 'GET_DAILY_BY_ID_FAILED',
      payload: err.response.data.message,
    });
  }
};

export const getDailyByIdAndYear = (token, year, page) => async dispatch => {
  try {
    const {data} = await http(token).get(
      `${REACT_APP_BASE_URL}/daily/search?year=${year}&page=${page}`,
    );
    dispatch({
      type: 'GET_DAILY_BY_ID',
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: 'GET_DAILY_BY_ID_FAILED',
      payload: err.response.data.message,
    });
  }
};

export const getDailyByIdAndDate = (token, date, page) => async dispatch => {
  try {
    const {data} = await http(token).get(
      `${REACT_APP_BASE_URL}/daily/search?date=${date}&page=${page}`,
    );
    dispatch({
      type: 'GET_DAILY_BY_ID',
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: 'GET_DAILY_BY_ID_FAILED',
      payload: err.response.data.message,
    });
  }
};

export const getDailyByIdCustom =
  (token, year1, month1, date1, year2, month2, date2, page) =>
  async dispatch => {
    try {
      const {data} = await http(token).get(
        `${REACT_APP_BASE_URL}/daily/search?year1=${year1}&month1=${month1}&date1=${date1}&year2=${year2}&month2=${month2}&date2=${date2}&page=${page}`,
      );
      dispatch({
        type: 'GET_DAILY_BY_ID',
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: 'GET_DAILY_BY_ID_FAILED',
        payload: err.response.data.message,
      });
    }
  };

export const postDaily = (token, desc) => async dispatch => {
  const form = new URLSearchParams();
  form.append('desc', desc);
  try {
    const {data} = await http(token).post(
      `${REACT_APP_BASE_URL}/daily/input`,
      form.toString(),
    );
    dispatch({
      type: 'POST_DAILY',
      payload: data.message,
    });
  } catch (err) {
    dispatch({
      type: 'POST_DAILY_FAILED',
      payload: err.response.data.message,
    });
  }
};

export const deleteDaily = (token, id) => async dispatch => {
  try {
    const {data} = await http(token).delete(
      `${REACT_APP_BASE_URL}/daily/${id}`,
    );
    dispatch({
      type: 'DELETE_DAILY',
      payload: data.message,
    });
  } catch (err) {
    dispatch({
      type: 'DELETE_DAILY_FAILED',
      payload: err.response.data.message,
    });
  }
};

//manajer
export const getDailyAllPegawaiByMonth =
  (token, month, page) => async dispatch => {
    // console.log(month);
    try {
      const {data} = await http(token).get(
        `${REACT_APP_BASE_URL}/daily/pegawai?month=${month}&page=${page}`,
      );
      dispatch({
        type: 'GET_DAILY_ALL_PEGAWAI',
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: 'GET_DAILY_ALL_PEGAWAI_FAILED',
        payload: err.response.data.message,
      });
    }
  };

export const getDailyAllPegawaiByYear =
  (token, year, page) => async dispatch => {
    try {
      const {data} = await http(token).get(
        `${REACT_APP_BASE_URL}/daily/pegawai?year=${year}&page=${page}`,
      );
      dispatch({
        type: 'GET_DAILY_ALL_PEGAWAI',
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: 'GET_DAILY_ALL_PEGAWAI_FAILED',
        payload: err.response.data.message,
      });
    }
  };

export const getDailyAllPegawaiByDate =
  (token, date, page) => async dispatch => {
    try {
      const {data} = await http(token).get(
        `${REACT_APP_BASE_URL}/daily/pegawai?date=${date}&page=${page}`,
      );
      dispatch({
        type: 'GET_DAILY_ALL_PEGAWAI',
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: 'GET_DAILY_ALL_PEGAWAI_FAILED',
        payload: err.response.data.message,
      });
    }
  };

export const getDailyAllPegawaiByCustom =
  (token, year1, month1, date1, year2, month2, date2, page) =>
  async dispatch => {
    const yearFrom =  year1.toString();
    const monthFrom =  month1.toString();
    const dateFrom = date1.toString();
    const yearTo =  year2.toString();
    const monthTo =  month2.toString();
    const dateTo = date2.toString();
    try {
      const {data} = await http(token).get(
        `${REACT_APP_BASE_URL}/daily/pegawai?year1=${yearFrom}&month1=${monthFrom}&date1=${dateFrom}&year2=${yearTo}&month2=${monthTo}&date2=${dateTo}&page=${page}`,
      );
      dispatch({
        type: 'GET_DAILY_ALL_PEGAWAI',
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: 'GET_DAILY_ALL_PEGAWAI_FAILED',
        payload: err.response.data.message,
      });
    }
  };
