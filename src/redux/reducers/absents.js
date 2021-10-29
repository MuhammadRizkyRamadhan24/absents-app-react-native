const initialState = {
    dataById: [],
    data: [],
    msg: '',
  };
  
  const absents = (state = initialState, action) => {
    switch (action.type) {
      case 'GET_ABSENT_BY_ID': {
        return {
          ...state,
          dataById: action.payload.results,
          msg: action.payload.message,
        };
      }
      case 'GET_ABSENT_BY_ID_FAILED': {
        return {
          ...state,
          msg: action.payload,
        };
      }
      case 'GET_ABSENT_ALL_PEGAWAI': {
        return {
          ...state,
          data: action.payload.results,
          msg: action.payload.message,
        };
      }
      case 'GET_ABSENT_ALL_PEGAWAI_FAILED': {
        return {
          ...state,
          msg: action.payload,
        };
      }
      case 'ABSENT': {
        return {
          ...state,
          msg: action.payload,
        };
      }
      case 'ABSENT_FAILED': {
        return {
          ...state,
          msg: '',
        };
      }
      case 'DELETE_ABSENT': {
        return {
          ...state,
          msg: action.payload,
        };
      }
      case 'DELETE_ABSENT_FAILED': {
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
  
  export default absents;
  