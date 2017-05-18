import { call, put, takeEvery } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import api from "../api"


function* list(action) {
  try {
    const response =  yield call(api.items.list);
    if(response) {
      yield put({type: "ITEM_LIST_SUCCEEDED", items: response.data});
      yield delay(30000);
      yield put({type: "ITEM_LIST_REQUESTED"});
      yield
    }
    else {
      yield put({type: "ITEM_LIST_FAILED", message: {}});
    }
  } catch (e) {
    yield put({type: "ITEM_LIST_FAILED", message: {}});
  }
}


export default function* () {
  yield [
    takeEvery("ITEM_LIST_REQUESTED", list),
  ]
}
