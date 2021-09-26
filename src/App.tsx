import { ChakraProvider } from '@chakra-ui/react'
import Home from './containers/Home'
import AlertMessage from './components/AlertMessage'
import { SettingsProvider } from './context/SettingsContext'

export function App() {
  return (
    <ChakraProvider>
      <SettingsProvider>
        <AlertMessage/>
        <Home/>
      </SettingsProvider>
    </ChakraProvider>
  )
}
