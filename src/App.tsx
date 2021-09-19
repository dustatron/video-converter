import { ChakraProvider } from '@chakra-ui/react'
import Home from './containers/Home'
export function App() {
  return (
    <ChakraProvider>
      <Home />
    </ChakraProvider>
  )
}
