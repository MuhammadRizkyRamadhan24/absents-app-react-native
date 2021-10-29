const initialState = {
    dataById: [],
    data: [],
    msg: '',
  };
  
  const dailys = (state = initialState, action) => {
    switch (action.type) {
      case 'GET_DAILY_BY_ID': {
        return {
          ...state,
          dataById: action.payload.results,
          msg: '',
        };
      }
      case 'GET_DAILY_BY_ID_FAILED': {
        return {
          ...state,
          msg: action.payload,
        };
      }
      case 'GET_DAILY_ALL_PEGAWAI': {
        return {
          ...state,
          data: action.payload.results,
          msg: '',
        };
      }
      case 'GET_DAILY_ALL_PEGAWAI_FAILED': {
        return {
          ...state,
          msg: action.payload,
        };
      }
      case 'POST_DAILY': {
        return {
          ...state,
          msg: '',
        };
      }
      case 'POST_DAILY_FAILED': {
        return {
          ...state,
          msg: action.payload,
        };
      }
      case 'DELETE_DAILY': {
        return {
          ...state,
          msg: '',
        };
      }
      case 'DELETE_DAILY_FAILED': {
        return {
          ...state,
          msg: action.payload,
        };
      }
      default: {
        return {
          ...state,
        };
      }
    }
  };
  
  export default dailys;
  