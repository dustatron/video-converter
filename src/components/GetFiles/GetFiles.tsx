import { ReactElement, useCallback, ChangeEvent } from 'react'
import {
  VStack,
  Stack,
  Box,
  Button,
  Select,
  Text,
} from '@chakra-ui/react'
import { useDropzone } from 'react-dropzone'
import {
  File,
  ProRes,
  ConvertStatus,
  ActionsFiles,
  Action,
  State,
} from '../../utils'
import { ArrowRightIcon, DeleteIcon } from '@chakra-ui/icons'
import ListItem from '../ListItem'

interface Props {
  toLocation: string
  proResFlavor: ProRes
  setProResFlavor: (flavor: ProRes) => void
  setErrorMessage: (message: string) => void
  errorMessage: string
  filesList: State
  dispatchFileList: (action: Action) => void
}

function GetFiles({
  toLocation,
  proResFlavor,
  setProResFlavor,
  setErrorMessage,
  errorMessage,
  dispatchFileList,
  filesList,
}: Props): ReactElement {

  const handleProRes = (e: ChangeEvent<HTMLSelectElement>) => {
    const flavor = e.target.value
    setProResFlavor(flavor as ProRes)
  }

  const makeUpdate = (index: number, update: ConvertStatus) => {
    const { progress, hasEnded, errorMessage, hasStarted, isComplete } = update
    if (hasStarted && !hasEnded) {
      dispatchFileList({
        type: ActionsFiles.UpdateItem,
        payload: {
          index: index,
          item: {
            ...filesList[index],
            status: {
              hasStarted: true,
              hasEnded: false,
              isComplete: false,
              progress: 0,
              errorMessage: null
            },
          },
        },
      })
    }

    if (hasStarted && progress) {
      dispatchFileList({
        type: ActionsFiles.UpdateItem,
        payload: {
          index: index,
          item: {
            ...filesList[index],
            status: {
              hasStarted: true,
              hasEnded: false,
              isComplete: false,
              progress: progress,
              errorMessage: null
            },
          },
        },
      })
    }

    if (isComplete) {
      dispatchFileList({
        type: ActionsFiles.UpdateItem,
        payload: {
          index: index,
          item: {
            ...filesList[index],
            status: {
              hasStarted: true,
              hasEnded: true,
              isComplete: true,
              progress: 0,
              errorMessage: null
            },
          },
        },
      })
    }

    if (errorMessage) {
      dispatchFileList({
        type: ActionsFiles.UpdateItem,
        payload: {
          index: index,
          item: {
            ...filesList[index],
            status: {
              hasStarted: true,
              hasEnded: true,
              isComplete: false,
              progress: 0,
              errorMessage: errorMessage,
            },
          },
        },
      })
    }
  }

  const handleStart = () => {
    if (toLocation.length <= 0) {
      return setErrorMessage('Please set destination')
    }
    if (filesList.length <= 0) {
      return setErrorMessage('No Files to convert')
    }
    if (filesList.length > 0) {
      return filesList.forEach((file, index) => {
        window.Main.makeProRes(
          file.path,
          file.name,
          toLocation,
          proResFlavor,
          index,
          makeUpdate
        )
      })
    } else {
      return setErrorMessage('Something went wrong')
    }
  }

  const onDropMemo = useCallback(
    acceptedFile => {
      dispatchFileList({
        type: ActionsFiles.AddFiles,
        payload: { index: 0, files: acceptedFile },
      })
      console.log(filesList)
    },
    [filesList]
  )

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop: onDropMemo,
    noClick: true,
    noKeyboard: true,
  })

  return (
    <>
      <VStack spacing={2} marginTop={5}>
        <Stack direction="row" width="100%">
          <Text
            fontSize="l"
            fontWeight="semibold"
            width="20%"
            align="center"
            padding="2"
          >
            Presets
          </Text>
          <Select value={proResFlavor} onChange={handleProRes}>
            <option value={ProRes.PROXY}>{ProRes.PROXY}</option>
            <option value={ProRes.LT}>{ProRes.LT}</option>
            <option value={ProRes.STANDARD}>{ProRes.STANDARD}</option>
            <option value={ProRes.HQ}>{ProRes.HQ}</option>
            <option value={ProRes.Quad4}>{ProRes.Quad4}</option>
          </Select>
          <Box>
            <Button
              background="green.500"
              color="white"
              onClick={handleStart}
              rightIcon={<ArrowRightIcon />}
              isDisabled={filesList.length <= 0}
            >
              Start
            </Button>
          </Box>
        </Stack>
        <Box
          height="8em"
          width="100%"
          border="2px"
          borderStyle="dashed"
          borderRadius="md"
          display="flex"
          flexDir="column"
          justifyContent="center"
          alignItems="center"
          bg="gray.100"
          id="From"
          {...getRootProps({ refKey: 'initialFile' })} // dropzone element
        >
          <input {...getInputProps()} />
          <Button
            margin="auto"
            display="block"
            type="button"
            onClick={open}
            colorScheme="blue"
          >
            Choose files to convert
          </Button>
          {isDragActive ? (
            <Box padding="5" color="gray.500">
              Ready for files...
            </Box>
          ) : (
            <Box padding="2" width="100%" textAlign="center" color="gray.500">
              Or drag and drop there here
            </Box>
          )}
        </Box>
        <Stack direction="row">
          <Button>Cancel</Button>
          <Button
            rightIcon={<DeleteIcon />}
            onClick={() => {
              dispatchFileList({ type: ActionsFiles.ClearAll })
            }}
          >
            Clear All
          </Button>
        </Stack>
        <Stack direction="column" spacing={3} width="100%">
          {filesList.map((file: File, index: number) => (
            <ListItem
              file={file}
              dispatch={dispatchFileList}
              index={index}
              key={file.path}
            />
          ))}
        </Stack>
      </VStack>
    </>
  )
}

export default GetFiles
