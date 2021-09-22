import { ReactElement, useCallback, useState, ChangeEvent } from 'react'
import {
  VStack,
  Stack,
  Box,
  Button,
  Select,
  Text,
  Progress,
} from '@chakra-ui/react'
import { useDropzone } from 'react-dropzone'
import { File, ProRes } from '../../utils'
import { ArrowRightIcon, DeleteIcon } from '@chakra-ui/icons'

interface Props {
  toLocation: string
  proResFlavor: ProRes
  setProResFlavor: (flavor: ProRes) => void
  setErrorMessage: (message: string) => void
  errorMessage: string
}

interface Update {
  progress?: number
  end?: boolean
  error?: string
  start?: string
}

function GetFiles({
  toLocation,
  proResFlavor,
  setProResFlavor,
  setErrorMessage,
  errorMessage,
}: Props): ReactElement {
  const [fileList, setFileList] = useState<File[]>([])
  const [progress, setProgress] = useState<number>(0)
  const [status, setStatus] = useState<string>('not started')

  const handleProRes = (e: ChangeEvent<HTMLSelectElement>) => {
    const flavor = e.target.value
    setProResFlavor(flavor as ProRes)
  }

  const makeUpdate = (index: number, update: Update) => {
    const { progress, end, error, start } = update
    if (start) {
      setStatus('started')
    }

    if (progress) {
      setProgress(progress)
    }

    if (end) {
      setStatus('Finished')
    }

    if (error) {
      setErrorMessage('File has completed')
    }
  }

  const handleStart = () => {
    if (toLocation.length <= 0) {
      return setErrorMessage('Please set destination')
    }
    if (fileList.length <= 0) {
      return setErrorMessage('No Files to convert')
    }
    if (fileList.length > 0) {
      return fileList.forEach((file, index) => {
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
      setFileList([...fileList, ...acceptedFile])
      console.log(fileList)
    },
    [fileList]
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
          <Text fontSize="l" fontWeight="semibold" width="20%" align='center' padding='2'>
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
              isDisabled={fileList.length <= 0 }
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
          {...getRootProps({ refKey: 'initialFile' })}
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
              setFileList([])
            }}
          >
            Clear All
          </Button>
        </Stack>
        <Stack direction="column" spacing={3}>
          {fileList.map((file: File) => (
            <Box border="1px" key={file.path}>
              <Box>File:{file.name}</Box>
              <Box>Path:{file.path}</Box>
              <Box>Type:{file.type}</Box>
              <Box>Size:{file.size}</Box>
            </Box>
          ))}
        </Stack>

        <Box>{status}</Box>
        <Box>{errorMessage}</Box>
        <Box width="100%">
          {status === 'started' && (
            <Progress hasStripe isAnimated value={progress} />
          )}
          {status === 'Finished' && <Progress value={100} />}
        </Box>
      </VStack>
    </>
  )
}

export default GetFiles
