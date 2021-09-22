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

interface Props {
  toLocation: string
  proResFlavor: ProRes
  setProResFlavor: (flavor: ProRes) => void
  setErrorMessage: (message: string) => void
  errorMessage: string
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

  const handleProRes = (e: ChangeEvent<HTMLSelectElement>) => {
    const flavor = e.target.value
    setProResFlavor(flavor as ProRes)
  }

  const getProgress = (progress: number, index: number) => {
    setProgress(progress)
    console.log('progress', progress)
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
          getProgress
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
      <VStack spacing={6} marginTop={5}>
        <Stack direction="row" width="100%">
          <Text fontSize="l" fontWeight="bold" width="40%">
            ProRes Flavor
          </Text>
          <Select value={proResFlavor} onChange={handleProRes}>
            <option value={ProRes.PROXY}>{ProRes.PROXY}</option>
            <option value={ProRes.LT}>{ProRes.LT}</option>
            <option value={ProRes.STANDARD}>{ProRes.STANDARD}</option>
            <option value={ProRes.HQ}>{ProRes.HQ}</option>
            <option value={ProRes.Quad4}>{ProRes.Quad4}</option>
          </Select>
          <Box>
            <Button colorScheme="facebook" onClick={handleStart}>
              Run
            </Button>
          </Box>
        </Stack>
        <Box
          height="8em"
          width="100%"
          border="2px"
          borderRadius="md"
          bg="gray.100"
          id="From"
          {...getRootProps({ refKey: 'initialFile' })}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <Box padding="5" color="gray.500">
              Drop the files here ...
            </Box>
          ) : (
            <Box padding="5" color="gray.500">
              Drag and drop some files here, or click to select files
            </Box>
          )}
          <Button
            margin="auto"
            display="block"
            type="button"
            onClick={open}
            colorScheme="blue"
          >
            Open File Dialog
          </Button>
        </Box>
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
        <Box>{errorMessage}</Box>
        <Box width='100%'>
          { progress }
          <Progress hasStripe isAnimated value={progress} />
        </Box>
      </VStack>
    </>
  )
}

export default GetFiles
