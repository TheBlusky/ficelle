const hookEdit = (state = {hook_id: false, loading: true}, action) => {
  switch (action.type) {
    case "HOOKEDIT_LOAD_REQUEST":
    case "HOOKEDIT_DELETE_REQUEST":
      return {hook_id: action.data.hook_id, loading: true};
    case "HOOKEDIT_LOAD_SUCCEEDED":
      return {hook_id: state.hook_id, loading: false, hook: action.hook};
    case "HOOKEDIT_UPDATE_REQUESTS":
      return {hook_id: state.hook_id, loading: true, hook: state.hook};
    case "HOOKEDIT_LOAD_FAILED":
    case "HOOKEDIT_DELETE_FAILED":
    case "HOOKEDIT_UPDATE_SUCCEEDED":
    case "HOOKEDIT_UPDATE_FAILED":
    case "HOOKEDIT_CANCEL":
    case "HOOKEDIT_DELETE_SUCCEEDED":
      return {hook_id: false, loading: true};
    case "USER_LOGOUT_SUCCEEDED":
      return {hook_id: false, loading: true};
    default:
      return state;
  }
};

export default hookEdit

