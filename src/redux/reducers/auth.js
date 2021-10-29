const initialState = {
  token: null,
  msg: '',
  privileges: '',
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case 'AUTH_LOGIN': {
      return {
        ...state,
        token: action.payload.results.token,
        privileges: action.payload.results.privileges,
        msg: '',
      };
    }
    case 'AUTH_LOGIN_FAILED': {
      return {
        ...state,
        msg: action.payload,
      };
    }
    case 'AUTH_REGISTER': {
      return {
        ...state,
        msg: '',
      };
    }
    case 'AUTH_REGISTER_FAILED': {
      return {
        ...state,
        msg: action.payload,
      };
    }
    case 'AUTH_LOGOUT': {
      return {
        ...state,
        token: null,
        msg: '',
        privileges: '',
      };
    }
    case 'AUTH_RESET': {
      return {
        ...state,
        msg: '',
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default auth;
