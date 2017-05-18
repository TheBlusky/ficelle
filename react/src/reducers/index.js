import { combineReducers } from 'redux'
import user from './user'
import items from './items'
import error_message from './errormessage'
import feeds from "./feeds";
import feedCreation from "./feedCreation";
import hooks from "./hooks";
import hookCreation from "./hookCreation";
import hooksAvailable from "./hooksAvailable";

const reducer = combineReducers({
  user,
  error_message,
  feeds,
  feedCreation,
  hooks,
  hookCreation,
  hooksAvailable,
  items
});

export default reducer
