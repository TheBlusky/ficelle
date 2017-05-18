const user = (state = { logged: false, registered: false, loading: false }, action) => {
  switch (action.type) {
    case "USER_LOGIN_FAILED":
    case "USER_REGISTER_FAILED":
    case "USER_ME_FAILED":
      return { logged: false, registered: false, loading: false};
    case "USER_LOGIN_SUCCEEDED":
      return { logged: true, registered: false, loading: false };
    case "USER_ME_SUCCEEDED":
      return { logged: true, registered: false, loading: false, user: action.user };
    case "USER_REGISTER_SUCCEEDED":
      return { logged: false, registered: true, loading: false };
    case "USER_ME_REQUESTED":
    case "USER_LOGIN_REQUESTED":
    case "USER_REGISTER_REQUESTED":
      return { logged: false, registered: false, loading: true };
    default:
      return state;
  }
};

export default user

