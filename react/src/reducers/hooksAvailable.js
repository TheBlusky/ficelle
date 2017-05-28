const hooksAvailable = (state = [], action) => {
  switch (action.type) {
    case "HOOK_AVAILABLE_SUCCEEDED":
      return action.hooks;
    case "USER_LOGOUT_SUCCEEDED":
      return [];
    default:
      return state;
  }
};

export default hooksAvailable

