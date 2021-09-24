/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useReducer } from 'react'
import Settings from '../../components/Settings'
import GetFiles from '../../components/GetFiles'
import { ProRes, File } from '../../utils'
import { ActionsFiles, State, Action, Reducer } from '../../utils/index'
import {
  Container,
  Heading,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react'

const fileState: State = []

const filesReducer: Reducer<State, Action> = (state: State, action: Action) => {
  const { type, payload } = action
  switch (type) {
    case ActionsFiles.AddFiles:
      console.log(payload!.files!)
      const formatFiles = payload!.files!.map(
        (file): File => {
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
              progress: 0
            }
          }
        }
      )
      console.log('formate', formatFiles)
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

const Home = () => {
  const [filesList, dispatchFileList] = useReducer(filesReducer, fileState)
  const [toLocation, setToLocation] = useState<string>('')
  const [proResFlavor, setProResFlavor] = useState<ProRes>(ProRes.STANDARD)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const setLocalStorage = () => {
    localStorage.setItem('video-converter-to', toLocation)
    localStorage.setItem('video-converter-flavor', proResFlavor)
  }
  useEffect(() => {
    const toLocation = localStorage.getItem('video-converter-to')
    const flavor = localStorage.getItem('video-converter-flavor') as ProRes
    if (toLocation) {
      setToLocation(toLocation)
      setProResFlavor(flavor)
    }
  }, [])

  useEffect(() => {
    setLocalStorage()
  }, [toLocation, proResFlavor, setLocalStorage])

  return (
    <Container maxW="container.xl">
      <Heading>Video Converter</Heading>
      <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
          <Tab>Convert</Tab>
          <Tab>Settings</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <GetFiles
              filesList={filesList}
              dispatchFileList={dispatchFileList}
              toLocation={toLocation}
              proResFlavor={proResFlavor}
              setProResFlavor={setProResFlavor}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
            />
          </TabPanel>
          <TabPanel>
            <Settings toLocation={toLocation} setToLocation={setToLocation} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  )
}

export default Home
