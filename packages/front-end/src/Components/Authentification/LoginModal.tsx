import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import React from 'react'
import Divider from '@mui/material/Divider'
import api from '../../axios.config.js'
import { AxiosResponse } from 'axios'
import { useDispatch } from 'react-redux'
import { login } from '../../Context/user.reducer.js'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  textAlign: 'center',
}

interface LoginModalProps {
  onClose: () => void
  actionType: 'Login' | 'Sign Up'
  onSwitchAction: () => void
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, actionType, onSwitchAction }) => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [firstname, setFirstname] = React.useState('')
  const [lastname, setLastname] = React.useState('')
  const dispatch = useDispatch()

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstname(event.target.value)
  }

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastname(event.target.value)
  }

  const handleLogin = () => {
    api
      .post('/auth/login', { email, password })
      .then((response: AxiosResponse) => {
        dispatch(login(response.data.user))
      })
      .catch((error: AxiosResponse) => {
        console.log(error)
      })

    onClose()
  }

  const handleSignUp = () => {
    api
      .post('/auth/register', { email, password, firstname, lastname })
      .then((response: AxiosResponse) => {
        dispatch(login(response.data.user))
      })
      .catch((error: AxiosResponse) => {
        console.log(error)
      })

    onClose()
  }

  return (
    <Modal
      open={true}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {actionType}
        </Typography>
        {actionType === 'Sign Up' && (
          <>
            <TextField
              label="First Name"
              type="text"
              value={firstname}
              onChange={handleFirstNameChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Last Name"
              type="text"
              value={lastname}
              onChange={handleLastNameChange}
              fullWidth
              margin="normal"
            />
          </>
        )}
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={handleEmailChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          fullWidth
          margin="normal"
        />
        <Button
          style={{ width: '80%', margin: 10 }}
          variant="contained"
          color="primary"
          onClick={actionType === 'Login' ? handleLogin : handleSignUp}
        >
          {actionType}
        </Button>
        <Divider>ou</Divider>
        <Button
          style={{ width: '80%', margin: 10 }}
          variant="contained"
          color="primary"
          onClick={actionType === 'Login' ? handleLogin : handleSignUp}
        >
          <img src="" alt="" />
          Google
        </Button>
        <Typography
          style={{ cursor: 'pointer', color: 'blue', marginTop: 10 }}
          onClick={() => onSwitchAction()} // Appeler la fonction pour basculer entre Login et Sign Up
        >
          {actionType === 'Sign Up'
            ? 'Si vous avez déjà un compte, connectez-vous.'
            : "Si vous n'avez pas de compte, inscrivez-vous."}
        </Typography>
      </Box>
    </Modal>
  )
}

export default LoginModal
