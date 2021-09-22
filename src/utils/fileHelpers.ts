import { ProRes } from "."
import { PROPRES_422, PROPRES_HQ, PROPRES_4444, PROPRES_LT, PROPRES_PROXY } from './recipes'

export const removeFileExtension = (fileName: string) => {
  if (fileName.length <= 0) {
    return fileName
  }
  for (let i = fileName.length; i > 0; i --) {
    if (fileName[i] === '.') {
      return fileName.substring(0, i)
     }
  }
}

export const getRecipe = (profile: ProRes) => {
  switch (profile) {
    case ProRes.PROXY:
      return PROPRES_PROXY
    case ProRes.LT:
      return PROPRES_LT
    case ProRes.STANDARD:
      return PROPRES_422
    case ProRes.HQ:
      return PROPRES_HQ
    case ProRes.Quad4:
      return PROPRES_4444
    default:
      return PROPRES_422
  }
 }
export const getPresetNumber = (profile: ProRes) => {
  switch (profile) {
    case ProRes.PROXY:
      return 0
    case ProRes.LT:
      return 1
    case ProRes.STANDARD:
      return 2
    case ProRes.HQ:
      return 3
    case ProRes.Quad4:
      return 4
    default:
      return 1
  }
 }