import { ReactElement, useCallback, useState, ChangeEvent } from 'react'
import {
  VStack,
  Stack,
  Box,
  Button,
  Select,
  Text,
} from '@chakra-ui/react'
import { useDropzone } from 'react-dropzone'
import{ File, ProRes } from '../../utils'

interface Props {
  toLocation: string,
  setToLocation: (location: string) => void
  fileList: File[]
  setFileList: (files: File[])=>void
 }



function GetFiles({ toLocation, setToLocation, fileList, setFileList }:Props): ReactElement {
  

  const [proResFlavor, setProResFlavor] = useState<ProRes>(ProRes.STANDARD)

  const handleProRes = (e: ChangeEvent<HTMLSelectElement>) => {
    const flavor = e.target.value
    setProResFlavor(flavor as ProRes)
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
      <Stack direction='row' width='100%'>
          <Text fontSize="l" fontWeight="bold" width='40%'>
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
          <Button colorScheme="facebook">Run</Button>
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
        <Stack direction='column' spacing={3}>
          {fileList.map((file: File) => (
            <Box border="1px" key={file.path}>
              <Box>File:{file.name}</Box>
              <Box>Path:{file.path}</Box>
              <Box>Type:{file.type}</Box>
              <Box>Size:{file.size}</Box>
            </Box>
          ))}
        </Stack>
       
      </VStack>
    </>
  )
}

export default GetFiles
