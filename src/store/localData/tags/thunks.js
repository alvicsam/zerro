import sendEvent from 'helpers/sendEvent'
import { setTag, getTag } from 'store/localData/tags'

export const patchTag = tag => (dispatch, getState) => {
  sendEvent('Tag: edit')
  dispatch(
    setTag({
      ...getTag(getState(), tag.id),
      ...tag,
      changed: Date.now(),
    })
  )
}
