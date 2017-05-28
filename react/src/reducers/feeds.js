const feeds = (state = [], action) => {
  switch (action.type) {
    case "FEED_LIST_SUCCEEDED":
      return action.feeds;
    case "USER_LOGOUT_SUCCEEDED":
      return [];
    default:
      return state;
  }
};

export default feeds

