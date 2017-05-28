import { call, put, takeEvery } from 'redux-saga/effects'
import api from "../api"

function* list(action) {
  try {
    const response =  yield call(api.hooks.list);
    if(response) {
      yield put({type: "HOOK_LIST_SUCCEEDED", hooks: response.data});
    }
    else {
      yield put({type: "HOOK_LIST_FAILED", message: {}});
    }
  } catch (e) {
    yield put({type: "HOOK_LIST_FAILED", message: {}});
  }
}

function* create(action) {
  try {
    const response =  yield call(
      api.hooks.create,
      action.data.title, action.data.type, action.data.feed, action.data.settings, action.data.frequency
    );
    if(response) {
      yield put({type: "HOOK_CREATE_SUCCEEDED"});
    }
    else {
      yield put({type: "HOOK_CREATE_FAILED", message: {}});
    }
  } catch (e) {
    yield put({type: "HOOK_CREATE_FAILED", message: {}});
  }
}


function* move(action) {
  try {
    const status =  yield call(api.hooks.patch, action.data.hook_id, {feed: action.data.to_feed_id});
    if(status) {
      yield put({type: "HOOK_MOVE_SUCCEEDED"});
    }
    else {
      yield put({type: "HOOK_MOVE_FAILED", message: {}});
    }
  } catch (e) {
    yield put({type: "HOOK_MOVE_FAILED", message: {}});
  }
}


function* retrieve(action) {
  try {
    const status =  yield call(api.hooks.retrieve, action.data.hook_id);
    if(status) {
      yield put({type: "HOOKEDIT_LOAD_SUCCEEDED", hook: status.data});
    }
    else {
      yield put({type: "HOOKEDIT_LOAD_FAILED", message: {}});
    }
  } catch (e) {
    yield put({type: "HOOKEDIT_LOAD_FAILED", message: {}});
  }
}


function* remove(action) {
  try {
    const status =  yield call(api.hooks.remove, action.data.hook_id);
    if(status) {
      yield put({type: "HOOKEDIT_DELETE_SUCCEEDED"});
      yield put({type: "FEED_LIST_REQUESTED"});
    }
    else {
      yield put({type: "HOOKEDIT_DELETE_FAILED", message: {}});
    }
  } catch (e) {
    yield put({type: "HOOKEDIT_DELETE_FAILED", message: {}});
  }
}


function* update(action) {
  try {
    const status =  yield call(api.hooks.patch, action.data.hook_id, action.data.hook_data);
    if(status) {
      yield put({type: "HOOKEDIT_UPDATE_SUCCEEDED"});
      yield put({type: "FEED_LIST_REQUESTED"});
    }
    else {
      yield put({type: "HOOKEDIT_UPDATE_FAILED", message: {}});
    }
  } catch (e) {
    yield put({type: "HOOKEDIT_UPDATE_FAILED", message: {}});
  }
}

function* getAvailableHooks(action) {
  try {
    const response =  yield call(api.hooks.getAvailableHooks);
    if(response) {
      yield put({type: "HOOKTYPES_LIST_SUCCEEDED", data: response.data});
    }
    else {
      yield put({type: "HOOKTYPES_LIST_FAILED", message: {}});
    }
  } catch (e) {
    yield put({type: "HOOKTYPES_LIST_FAILED", message: {}});
  }
}

export default function* () {
  yield [
    takeEvery("HOOK_LIST_REQUESTED", list),
    takeEvery("HOOK_CREATE_REQUESTED", create),
    takeEvery("HOOK_MOVE_REQUESTED", move),
    takeEvery("HOOKEDIT_LOAD_REQUEST", retrieve),
    takeEvery("HOOKEDIT_DELETE_REQUESTS", remove),
    takeEvery("HOOKEDIT_UPDATE_REQUESTS", update),
    takeEvery("HOOKTYPES_LIST_REQUESTED", getAvailableHooks)
  ]
}
