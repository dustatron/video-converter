import {
  useContext,
  useState,
  useReducer,
  useEffect,
  createContext,
  ReactElement,
  FC
} from "react"
import { State, SettingsHook, filesReducer, ProRes } from "../utils"

const SettingsContext = createContext<SettingsHook>({} as SettingsHook)

export function useSettings() {
  return useContext<SettingsHook>(SettingsContext)
}
const fileState: State = []
export const SettingsProvider: FC = ({ children }): ReactElement => {
  const [alert, setAlert] = useState<string | null>(null)
  const [filesList, dispatchFileList] = useReducer(filesReducer, fileState)
  const [toLocation, setToLocation] = useState<string>('')
  const [proResFlavor, setProResFlavor] = useState<ProRes>(ProRes.STANDARD)
  const [fileTypes, setFileTypes] = useState<string>('mp4, mov, webm, avi, mkv')

  const setLocalStorage = () => {
    localStorage.setItem('video-converter-to', toLocation)
    localStorage.setItem('video-converter-flavor', proResFlavor)
    localStorage.setItem('video-converter-fileTypes', fileTypes)
  }
  useEffect(() => {
    const toLocation = localStorage.getItem('video-converter-to')
    const flavor = localStorage.getItem('video-converter-flavor') as ProRes
    const fileTypes = localStorage.getItem('video-converter-fileTypes')
    if (toLocation) {
      setToLocation(toLocation)
    }
    if (flavor) {
      setProResFlavor(flavor)
    }
    if (fileTypes) {
      setFileTypes(fileTypes)
    }
  }, [])

  useEffect(() => {
    setLocalStorage()
  }, [toLocation, proResFlavor, setLocalStorage])

  const value: SettingsHook = {
    filesList,
    dispatchFileList,
    toLocation,
    setToLocation,
    proResFlavor,
    setProResFlavor,
    fileTypes,
    setFileTypes,
    alert,
    setAlert
  }

  return (
    <SettingsContext.Provider value={value}>
      { children }
    </SettingsContext.Provider>
  )
  
}