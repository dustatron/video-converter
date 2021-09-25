/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useReducer, Dispatch, SetStateAction } from 'react'
import Settings from '../../components/Settings'
import GetFiles from '../../components/GetFiles'
import { ProRes, File } from '../../utils'
import { State} from '../../utils/index'
import { filesReducer } from './reducer'
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

interface Props {
  setAlert: (value: string | null) => void
}

const Home = ({ setAlert }:Props) => {
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
              setAlert={setAlert}
            />
          </TabPanel>
          <TabPanel>
            <Settings
              toLocation={toLocation}
              setToLocation={setToLocation}
              fileTypes={fileTypes}
              setFileTypes={setFileTypes}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  )
}

export default Home
