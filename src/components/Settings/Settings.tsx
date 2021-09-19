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

const Settings = ({ toLocation, setToLocation}: Props) => {
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
          <Button>Location</Button>
        </HStack>
    </div>
  )
}

export default Settings
