/* eslint-disable no-unused-vars */
import { Flex, Center, Box, Button, Icon, Progress, Spinner } from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'
import { File, ActionsFiles, Action } from '../../utils'
import { FaTag, FaCheckCircle } from 'react-icons/fa'
import { RiErrorWarningFill } from 'react-icons/ri'

interface Props {
  file: File
  index: number
  dispatch: (action: Action) => void
}

const ListItem = ({ file, index, dispatch }: Props) => {
  const { status } = file
  const getStatusReport = () => {
    const { errorMessage, isComplete, hasEnded, hasStarted } = status
    if (errorMessage) {
      return errorMessage
    }
    if (hasStarted && !hasEnded && !isComplete) {
      return 'Converting File'
    }

    if (hasStarted && hasEnded && !isComplete) {
      return 'There was an issue'
    }
    if (isComplete) {
      return 'Finished'
    }

    if (!hasStarted && !hasEnded && !isComplete) {
      return 'Ready'
    }
  }
  return (
    <Flex border="1px" width="100%" borderRadius="md">
      <Center width="15%">
        {!status.hasStarted && <Icon as={FaTag} />}
        {status.hasStarted && !status.hasEnded && <Spinner />}
        {status.isComplete && <Icon as={FaCheckCircle} />}
        {status.errorMessage && <Icon as={RiErrorWarningFill} />}
      </Center>
      <Box width="80%" padding="2" height="6em">
        Source: <strong>{file.name}</strong>
        <Box>Status: {getStatusReport()}</Box>
        {!status.isComplete && (
          <Progress hasStripe isAnimated value={status.progress} />
        )}
        {status.isComplete && <Progress value={100} />}
      </Box>
      <Box width="10%">
        <Button
          onClick={() => {
            dispatch({ type: ActionsFiles.RemoveItem, payload: { index } })
          }}
        >
          <CloseIcon />
        </Button>
      </Box>
    </Flex>
  )
}

export default ListItem
