const feedEdit = (state = {feed_id: false, loading: true}, action) => {
  switch (action.type) {
    case "FEEDEDIT_LOAD_REQUEST":
    case "FEEDEDIT_DELETE_REQUEST":
      return {feed_id: action.data.feed_id, loading: true};
    case "FEEDEDIT_LOAD_SUCCEEDED":
      return {feed_id: state.feed_id, loading: false, feed: action.feed};
    case "FEEDEDIT_UPDATE_REQUESTS":
      return {feed_id: state.feed_id, loading: true, feed: state.feed};
    case "FEEDEDIT_LOAD_FAILED":
    case "FEEDEDIT_DELETE_FAILED":
    case "FEEDEDIT_UPDATE_SUCCEEDED":
    case "FEEDEDIT_UPDATE_FAILED":
    case "FEEDEDIT_CANCEL":
    case "FEEDEDIT_DELETE_SUCCEEDED":
      return {feed_id: false, loading: true};
    case "USER_LOGOUT_SUCCEEDED":
      return {feed_id: false, loading: true};
    default:
      return state;
  }
};

export default feedEdit

