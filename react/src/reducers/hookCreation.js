const hookCreation = (state = {loading: false, success: false}, action) => {
  switch (action.type) {
    case "HOOK_CREATE_REQUESTED":
      return {loading: true, success: false};
    case "HOOK_CREATE_SUCCEEDED":
      return {loading: false, success: true};
    case "HOOK_CREATE_FAILED":
      return {loading: false, success: false};
    case "USER_LOGOUT_SUCCEEDED":
      return {loading: false, success: false};
    default:
      return state;
  }
};

export default hookCreation;