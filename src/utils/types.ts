/* eslint-disable no-unused-vars */
export enum ProRes {
  PROXY = 'ProPres Proxy',
  LT = 'ProPres LT',
  STANDARD = 'PropRes 422',
  HQ = 'ProRes HQ',
  Quad4 = 'ProRes 4444',
}

export enum ActionsFiles {
  AddFiles = 'ADD_FILES',
  ClearAll = 'CLEAR_ALL',
  RemoveItem = 'REMOVE_FILE',
  UpdateItem = 'UPDATE_ITEM',
}
export interface ConvertStatus {
  progress?: number
  hasEnded: boolean
  isComplete: boolean
  hasStarted: boolean
  errorMessage: string
}

export interface File {
  lastModified: number
  lastModifiedDate: Date
  name: string
  path: string
  size: number
  type: string
  webkitRelativePath: string
  status?: ConvertStatus
}
export interface Payload {
  index?: number,
  files?: File[],
  item?: File
}

export type State = File[]

export type Action = {
  type: ActionsFiles,
  payload?: Payload
}

export type Reducer<State, Action> = (state: State, action: Action) => State;