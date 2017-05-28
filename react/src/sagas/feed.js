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

function* retrieve(action) {
  try {
    const status =  yield call(api.feeds.retrieve, action.data.feed_id);
    if(status) {
      yield put({type: "FEEDEDIT_LOAD_SUCCEEDED", feed: status.data});
    }
    else {
      yield put({type: "FEEDEDIT_LOAD_FAILED", message: {}});
    }
  } catch (e) {
    yield put({type: "FEEDEDIT_LOAD_FAILED", message: {}});
  }
}


function* remove(action) {
  try {
    const status =  yield call(api.feeds.remove, action.data.feed_id);
    if(status) {
      yield put({type: "FEEDEDIT_DELETE_SUCCEEDED"});
      yield put({type: "FEED_LIST_REQUESTED"});
    }
    else {
      yield put({type: "FEEDEDIT_DELETE_FAILED", message: {}});
    }
  } catch (e) {
    yield put({type: "FEEDEDIT_DELETE_FAILED", message: {}});
  }
}


function* update(action) {
  try {
    const status =  yield call(api.feeds.patch, action.data.feed_id, action.data.feed_data);
    if(status) {
      yield put({type: "FEEDEDIT_UPDATE_SUCCEEDED"});
      yield put({type: "FEED_LIST_REQUESTED"});
    }
    else {
      yield put({type: "FEEDEDIT_UPDATE_FAILED", message: {}});
    }
  } catch (e) {
    yield put({type: "FEEDEDIT_UPDATE_FAILED", message: {}});
  }
}


export default function* () {
  yield [
    takeEvery("FEED_LIST_REQUESTED", list),
    takeEvery("FEED_CREATE_REQUESTED", create),
    takeEvery("FEEDEDIT_LOAD_REQUEST", retrieve),
    takeEvery("FEEDEDIT_DELETE_REQUESTS", remove),
    takeEvery("FEEDEDIT_UPDATE_REQUESTS", update)
  ]
}
