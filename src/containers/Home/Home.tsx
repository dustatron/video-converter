import { useState } from 'react'
import Settings from '../../components/Settings'
import GetFiles from '../../components/GetFiles'
import {
  Container,
  Heading,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react'
import { File } from '../../utils'

const Home = () => {
  const [toLocation, setToLocation] = useState<string>(
    '/Users/dusty/Desktop/test/'
  )
  const [fileList, setFileList] = useState<File[]>([])
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
              toLocation={toLocation}
              setToLocation={setToLocation}
              fileList={fileList}
              setFileList={setFileList}
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
