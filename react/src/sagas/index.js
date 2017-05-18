import userSaga from './user'
import feedSaga from './feed'
import hookSaga from './hook'
import itemSaga from './item'

function* saga() {
  yield [
    userSaga(),
    feedSaga(),
    hookSaga(),
    itemSaga()
  ]
}

export default saga;
