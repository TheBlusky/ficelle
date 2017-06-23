import { call, put, takeEvery, select } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import api from "../api"


function* list(action) {
  try {
    const search = yield select((state) => state.ficelle.filters.id)
    const response =  yield call(api.items.list, search);
    if(response) {
      yield put({type: "ITEM_LIST_SUCCEEDED", items: response.data});
      const locked = yield select((state) => state.ficelle.listLock.locked);
      if(!locked) {
        yield put({type: "LISTLOCK_LOCK"});
        yield delay(30000);
        yield put({type: "LISTLOCK_UNLOCK"});
        yield put({type: "ITEM_LIST_REQUESTED"});
      }
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
    takeEvery("FILTERS_CHANGE", list),
    takeEvery("FILTERS_REMOVE", list)
  ]
}
