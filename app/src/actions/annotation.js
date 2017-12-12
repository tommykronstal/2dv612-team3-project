import {UPDATE_ANNOTATION} from './types'

export const updateAnnotation = (annotationText, materialId) => ({
  type: UPDATE_ANNOTATION,
  annotationText,
  materialId
})
