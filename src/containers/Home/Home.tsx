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
import { useSettings } from '../../context/SettingsContext'

const Home = () => {
  const { setAlert } = useSettings()

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
              setAlert={setAlert}
            />
          </TabPanel>
          <TabPanel>
            <Settings/>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  )
}

export default Home
