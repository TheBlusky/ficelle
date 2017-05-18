const error_message = (state = { message_id: -1, message: ""}, action) => {
  switch (action.type) {
    case "USER_LOGIN_FAILED":
      return { message_id: state.message_id + 1 , message: "Authentication failed"};
    default:
      return state;
  }
};

export default error_message

