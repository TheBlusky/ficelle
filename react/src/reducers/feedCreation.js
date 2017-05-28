const feedCreation = (state = {loading: false, success: false}, action) => {
  switch (action.type) {
    case "FEED_CREATE_REQUESTED":
      return {loading: true, success: false};
    case "FEED_CREATE_SUCCEEDED":
      return {loading: false, success: true};
    case "FEED_CREATE_FAILED":
      return {loading: false, success: false};
    case "USER_LOGOUT_SUCCEEDED":
      return {loading: false, success: false}
    default:
      return state;
  }
};

export default feedCreation;