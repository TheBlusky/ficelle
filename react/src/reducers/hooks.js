const hooks = (state = [], action) => {
  switch (action.type) {
    case "HOOK_LIST_SUCCEEDED":
      return action.hooks;
    default:
      return state;
  }
};

export default hooks

