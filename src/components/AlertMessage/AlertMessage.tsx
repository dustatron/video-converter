import {
  Alert,
  AlertIcon,
  AlertDescription,
  CloseButton,
} from '@chakra-ui/react'

interface Props {
  alert: string | null
  setAlert: (value: string | null) => void
}


const AlertMessage = ({ alert, setAlert }: Props) => {
  return (
    <>
      {alert && (
        <Alert status="error">
          <AlertIcon />
          <AlertDescription>
            { alert }
          </AlertDescription>
          <CloseButton position="absolute" right="8px" top="8px" onClick={() => { setAlert(null)}} />
        </Alert>
      )}
    </>
  )
}

export default AlertMessage
