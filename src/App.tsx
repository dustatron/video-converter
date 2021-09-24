import { useState } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import Home from './containers/Home'
import AlertMessage from './components/AlertMessage'
export function App() {
  const [alert, setAlert] = useState<string | null>(null)
  return (
    <ChakraProvider>
      <AlertMessage alert={alert} setAlert={setAlert}/>
      <Home setAlert={setAlert}/>
    </ChakraProvider>
  )
}
