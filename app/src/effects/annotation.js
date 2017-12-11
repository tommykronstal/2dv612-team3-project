import {put, takeEvery, call, select} from 'redux-saga/effects'
import {post} from '../lib/http'
import {UPDATE_ANNOTATION, SET_STATUS} from '../actions/types'

export function* watchAnnotationActions() {
  yield takeEvery(UPDATE_ANNOTATION, updateAnnotation)
}

export function* updateAnnotation({annotationText, materialId}) {
  console.log(annotationText, materialId)
  const {token} = yield select(state => ({
    token: state.auth.jaw,
  }))

  const response = yield call(
    post,
    `/api/product/material/${materialId}/annotation`,
    {
      headers: {
        Authorization: token,
      },
    },
  )

  if (response.status === 201 || response.status === 200) {
    yield put({
      type: SET_STATUS,
      message: 'Your annotation successfully updated.',
    })
  } else {
    console.log('SOMETHING ELSE HAPPEND OMG KERNEL PANIC')
  }
}
