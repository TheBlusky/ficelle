import { combineReducers } from 'redux'
import user from './user'
import items from './items'
import error_message from './errormessage'
import feeds from "./feeds";
import feedCreation from "./feedCreation";
import hooks from "./hooks";
import hookCreation from "./hookCreation";
import hooksAvailable from "./hooksAvailable";
import hookEdit from "./hookEdit";
import feedEdit from "./feedEdit";
import hookTypes from "./hookTypes";
import filters from "./filters";

const reducer = combineReducers({
  user,
  error_message,
  feeds,
  feedEdit,
  feedCreation,
  hooks,
  hookEdit,
  hookTypes,
  hookCreation,
  hooksAvailable,
  items,
  filters
});

export default reducer
