import {
  HStack,
  Button,
  Input,
  Stack,
  FormControl,
  FormLabel,
} from '@chakra-ui/react'
import { useSettings } from '../../context/SettingsContext'


const Settings = () => {
  const { toLocation, setToLocation, fileTypes, setFileTypes } = useSettings()
  
  const openDialogBox = async () => {
    const result = await window.Main.getFolder()
    if (!result.canceled) {
      setToLocation(result.filePaths[0])
    }
  }
  return (
    <Stack spacing='5'>
      <FormControl id="Destination" isRequired>
        <FormLabel>Destination</FormLabel>
        <HStack>
          <Input
            type="text"
            value={toLocation}
            onChange={e => setToLocation(e.target.value)}
          />
          <Button onClick={openDialogBox}>Location</Button>
        </HStack>
      </FormControl>
      <FormControl id="file-types">
        <FormLabel>File Tiles</FormLabel>
        <Input value={fileTypes} onChange={(e)=>setFileTypes(e.target.value)}/>
      </FormControl>
    </Stack>
  )
}

export default Settings
