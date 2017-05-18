const feeds = (state = [], action) => {
  switch (action.type) {
    case "FEED_LIST_SUCCEEDED":
      return action.feeds;
    default:
      return state;
  }
};

export default feeds

