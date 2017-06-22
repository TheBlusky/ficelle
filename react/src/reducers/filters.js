const filters = (state = {id: undefined}, action) => {
  switch (action.type) {
    case "FILTERS_CHANGE":
      return {id: action.id};
    case "FILTERS_REMOVE":
      return {id: undefined};
    default:
      return state;
  }
};

export default filters

