import { call, put, takeEvery } from 'redux-saga/effects'
import api from "../api"

function* list(action) {
  try {
    const response =  yield call(api.feeds.list);
    if(response) {
      yield put({type: "FEED_LIST_SUCCEEDED", feeds: response.data});
    }
    else {
      yield put({type: "FEED_LIST_FAILED", message: {}});
    }
  } catch (e) {
    yield put({type: "FEED_LIST_FAILED", message: {}});
  }
}

function* create(action) {
  try {
    const response =  yield call(api.feeds.create, action.data.title);
    if(response) {
      yield put({type: "FEED_CREATE_SUCCEEDED", message: {}});
    }
    else {
      yield put({type: "FEED_CREATE_FAILED", message: {}});
    }
  } catch (e) {
    yield put({type: "FEED_CREATE_FAILED", message: {}});
  }
}

function* remove(action) {
  try {
    const status =  yield call(api.feeds.remove, action.data.title);
    if(status) {
      yield put({type: "FEED_REMOVE_SUCCEEDED", user: {}});
    }
    else {
      yield put({type: "FEED_REMOVE_FAILED", message: {}});
    }
  } catch (e) {
    yield put({type: "FEED_REMOVE_FAILED", message: {}});
  }
}


export default function* () {
  yield [
    takeEvery("FEED_LIST_REQUESTED", list),
    takeEvery("FEED_CREATE_REQUESTED", create),
    takeEvery("FEED_REMOVE_REQUESTED", remove)
  ]
}
