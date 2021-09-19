import Settings from '../../components/Settings'
import GetFiles from '../../components/GetFiles'
import { Container, Heading } from '@chakra-ui/react'
interface Props {}

const Home = (props: Props) => {
  return (
    <Container>
      <Heading>Video Converter</Heading>
      <GetFiles />
      <Settings />
    </Container>
  )
}

export default Home
