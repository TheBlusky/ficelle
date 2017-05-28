import { call, put, takeEvery } from 'redux-saga/effects'
import api from "../api"

function* login(action) {
  try {
    const status =  yield call(api.users.login, action.data.email, action.data.password);
    if(status) {
      yield put({type: "USER_LOGIN_SUCCEEDED", user: {}});
    }
    else {
      yield put({type: "USER_LOGIN_FAILED", message: {}});
    }
  } catch (e) {
    yield put({type: "USER_LOGIN_FAILED", message: {}});
  }
}

function* register(action) {
  try {
    const status =  yield call(api.users.register, action.data.email, action.data.password);
    if(status) {
      yield put({type: "USER_REGISTER_SUCCEEDED", user: {}});
    }
    else {
      yield put({type: "USER_REGISTER_FAILED", message: {}});
    }
  } catch (e) {
    yield put({type: "USER_REGISTER_FAILED", message: {}});
  }
}

function* me(action) {
  try {
    const status =  yield call(api.users.me);
    if(status) {
      yield put({type: "USER_ME_SUCCEEDED", user: status.data.user});
    }
    else {
      yield put({type: "USER_ME_FAILED", message: {}});
    }
  } catch (e) {
    yield put({type: "USER_ME_FAILED", message: {}});
  }
}


function* logout(action) {
  try {
    const status =  yield call(api.users.logout);
    if(status) {
      yield put({type: "USER_LOGOUT_SUCCEEDED"});
    }
    else {
      yield put({type: "USER_LOGOUT_FAILED", message: {}});
    }
  } catch (e) {
    yield put({type: "USER_LOGOUT_FAILED", message: {}});
  }
}

export default function* () {
  yield [
    takeEvery("USER_LOGIN_REQUESTED", login),
    takeEvery("USER_LOGOUT_REQUESTED", logout),
    takeEvery("USER_REGISTER_REQUESTED", register),
    takeEvery("USER_ME_REQUESTED", me),
  ]
}
