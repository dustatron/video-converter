import {
  HStack,
  Button,
  Input,
  Text
} from '@chakra-ui/react'

interface Props {
  toLocation: string,
  setToLocation: (location: string) => void
}


const Settings = ({ toLocation, setToLocation }: Props) => {
  const openDialogBox = async () => {
    const result = await window.Main.getFolder()
    if (!result.canceled) {
      setToLocation(result.filePaths[0])
    }
   }
  return (
    <div>
      <Text>
        Destination
      </Text>
      <HStack>
          <Input
            type="text"
            value={toLocation}
            onChange={e => setToLocation(e.target.value)}
          />
        <Button onClick={openDialogBox}>Location</Button>
        </HStack>
    </div>
  )
}

export default Settings
