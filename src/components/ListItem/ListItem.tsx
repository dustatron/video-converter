/* eslint-disable no-unused-vars */
import {
  VStack,
  Stack,
  Box,
  Button,
  Select,
  Text,
  Progress,
} from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'
import { File, Payload, ActionsFiles, Action } from '../../utils'

interface Props {
  file: File
  index: number
  dispatch: (action: Action) => void
}

const ListItem = ({ file, index, dispatch }: Props) => {
  return (
    <Box border="1px" key={file.path}>
      <Box>File:{file.name}</Box>
      <Box>Path:{file.path}</Box>
      <Box>Type:{file.type}</Box>
      <Box>Size:{file.size}</Box>
      <Button
        onClick={() => {
          dispatch({ type: ActionsFiles.RemoveItem, payload: { index } })
        }}
      >
        <CloseIcon />
      </Button>
    </Box>
  )
}

export default ListItem
