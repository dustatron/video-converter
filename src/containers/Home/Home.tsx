import Settings from '../../components/Settings'
import GetFiles from '../../components/GetFiles'
import {
  Container,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react'

const Home = () => {

  return (
    <Container maxW="container.xl" padding='4'>
      <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
          <Tab>Batch Convert</Tab>
          <Tab>Settings</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <GetFiles/>
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
