const hooksAvailable = (state = [], action) => {
  switch (action.type) {
    case "HOOK_AVAILABLE_SUCCEEDED":
      return action.hooks;
    default:
      return state;
  }
};

export default hooksAvailable

