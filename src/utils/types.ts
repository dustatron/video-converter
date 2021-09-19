/* eslint-disable no-unused-vars */
export enum ProRes {
  PROXY = 'ProPres Proxy',
  LT = 'ProPres LT',
  STANDARD = 'PropRes 422',
  HQ = 'ProRes HQ',
  Quad4 = 'ProRes 4444',
}

export interface File {
  lastModified: number
  lastModifiedDate: Date
  name: string
  path: string
  size: number
  type: string
  webkitRelativePath: string
}

