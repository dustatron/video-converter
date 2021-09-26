/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
import { ActionsFiles, State, Action, Reducer, File } from './index'

export const filesReducer: Reducer<State, Action> = (
  state: State,
  action: Action
) => {
  const { type, payload } = action
  switch (type) {
    case ActionsFiles.AddFiles:
      const formatFiles = payload!.files!.map((file): File => {
        return {
          lastModified: file.lastModified,
          lastModifiedDate: file.lastModifiedDate,
          name: file.name,
          path: file.path,
          size: file.size,
          type: file.type,
          webkitRelativePath: file.webkitRelativePath,
          status: {
            errorMessage: null,
            hasEnded: false,
            hasStarted: false,
            isComplete: false,
            progress: 0,
          },
        }
      })
      return [...state, ...formatFiles]
    case ActionsFiles.ClearAll:
      return []
    case ActionsFiles.RemoveItem:
      return state.filter((_, index) => index !== payload!.index!)
    case ActionsFiles.UpdateItem:
      const newState = state.map((item, index) => {
        if (index === payload?.index) {
          return payload.item
        }
        return item
      })
      return newState as File[]
    default:
      return state
  }
}
