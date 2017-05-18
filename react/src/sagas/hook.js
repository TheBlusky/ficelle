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
      action.data.title, action.data.type, action.data.feed, action.data.state, action.data.settings, action.data.frequency
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

function* remove(action) {
  try {
    const status =  yield call(api.hooks.remove, action.data.id);
    if(status) {
      yield put({type: "HOOK_REMOVE_SUCCEEDED"});
    }
    else {
      yield put({type: "HOOK_REMOVE_FAILED", message: {}});
    }
  } catch (e) {
    yield put({type: "HOOK_REMOVE_FAILED", message: {}});
  }
}


export default function* () {
  yield [
    takeEvery("HOOK_LIST_REQUESTED", list),
    takeEvery("HOOK_CREATE_REQUESTED", create),
    takeEvery("HOOK_REMOVE_REQUESTED", remove)
  ]
}
