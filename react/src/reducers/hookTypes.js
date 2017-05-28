const hookTypes = (state = {loading: false, loaded: false, types: []}, action) => {
  switch (action.type) {
    case "HOOKTYPES_LIST_REQUESTED":
      return {loading: true, loaded: false, types: []};
    case "HOOKTYPES_LIST_SUCCEEDED":
      return {loading: false, loaded: true, types: action.data.hooks};
    case "HOOKTYPES_LIST_FAILED":
      return {loading: false, loaded: false, types: []};
    case "USER_LOGOUT_SUCCEEDED":
      return {loading: false, loaded: false, types: []};
    default:
      return state;
  }
};

export default hookTypes;