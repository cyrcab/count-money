import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Avatar, Button, Popover, List, ListItem, ListItemText, Typography } from '@mui/material'
import LoginModal from './Authentification/LoginModal'
import '../Css/TopBar.css'
import logo from '../assets/logo.jpg'
import { useSelector } from 'react-redux'
import { RootState } from '../Context/RootReducer'
import api from '../axios.config'

interface TopBarProps {
  onTabChange: (tab: string) => void
}

const TopBar: React.FC<TopBarProps> = ({ onTabChange }) => {
  const [selectedItem, setSelectedItem] = useState<string | null>('Crypto')
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [isLoginModalOpen, setLoginModalOpen] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)

  const { isLoggedIn } = useSelector((state: RootState) => state.auth)

  const handleItemClick = (item: string) => {
    setSelectedItem(item)
    onTabChange(item)
    setAnchorEl(null) // Close the popover after clicking on an item
  }

  const handleLogin = () => {
    // Your authentication logic here
    // If authentication is successful, update the isLoggedIn state
    // Optionally, switch to the "Profile" tab after login
    setIsSignUp(false)
    setLoginModalOpen(true)
  }

  const handleSignUp = () => {
    setIsSignUp(true)
    setLoginModalOpen(true)
  }

  const handleLogout = async () => {
    try {
      const res = await api.delete('/auth/logout')
      if (res.status === 200) {
        window.location.reload()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleClickAvatar = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClosePopover = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'avatar-popover' : undefined

  // const handleLoginSuccess = () => {
  //   setIsLoggedIn(true)
  // }

  const handleSwitchAction = () => {
    setIsSignUp(!isSignUp) // Inverser la valeur de isSignUp
  }

  return (
    <div className="containerTopBar">
      <div className="leftSection">
        <div className="logoContainer">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <Link to="/">
          <div
            className={`onglet ${selectedItem === 'Crypto' ? 'selected' : ''}`}
            onClick={() => handleItemClick('Crypto')}
          >
            Crypto
          </div>
        </Link>
        <Link to="/">
          <div
            className={`onglet ${selectedItem === 'Actualité' ? 'selected' : ''}`}
            onClick={() => handleItemClick('Actualité')}
          >
            Actualités
          </div>
        </Link>
      </div>
      <div className="rightSection">
        {isLoggedIn ? (
          <>
            <Avatar
              alt="Alex"
              src="/static/images/avatar/1.jpg"
              onClick={handleClickAvatar}
              className={`onglet ${selectedItem === 'Profile' ? '' : ''}`}
            />
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClosePopover}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <List>
                <ListItem button onClick={() => handleItemClick('Profile')}>
                  <ListItemText>
                    <Typography variant="h6">Profile</Typography>
                  </ListItemText>
                </ListItem>
                <ListItem button onClick={handleLogout}>
                  <ListItemText>
                    <Typography variant="h6">Logout</Typography>
                  </ListItemText>
                </ListItem>
              </List>
            </Popover>
          </>
        ) : (
          <>
            <div className="login" onClick={handleLogin}>
              Login
            </div>
            <Button variant="contained" onClick={handleSignUp}>
              Sign up
            </Button>
          </>
        )}
      </div>

      {isLoginModalOpen && (
        <LoginModal
          onClose={() => setLoginModalOpen(false)}
          actionType={isSignUp ? 'Sign Up' : 'Login'}
          onSwitchAction={handleSwitchAction}
        />
      )}
    </div>
  )
}

export default TopBar
