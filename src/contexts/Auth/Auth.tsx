import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import DnsIcon from '@mui/icons-material/Dns'
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover
} from '@mui/material'
import { css, styled } from '@mui/system'
import { DataContext, SnackbarContext, StorageContext } from 'contexts'
import {
  User as AuthUser,
  EmailAuthProvider,
  createUserWithEmailAndPassword,
  deleteUser as deleteUserAuth,
  getAuth,
  onAuthStateChanged,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  signOut,
  updateEmail as updateAuthEmail,
  updatePassword as updateAuthPassword
} from 'firebase/auth'
import { createContext, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Register as RegisterProps } from 'types'

interface AuthContextProps {
  authUser: AuthUser | null
  register: (props: RegisterProps) => void
  login: (email: string, password: string, params?: string) => void
  logout: () => void
  deleteUser: () => void
  isUserLoading: boolean
  registerError: string | null
  loginError: string | null
  clearError: () => void
  updatePassword: (oldPassword: string, newPassword: string) => void
  updateEmail: (newEmail: string, password: string) => void
}

const auth = getAuth()

const AuthWrapper = styled('div')`
  position: fixed;
  top: 0.25rem;
  right: 0.25rem;
  color: #000;
  z-index: 11;
`

const Wrapper = styled('div')`
  display: flex;
`

const StyledPopover = styled(Popover)(
  ({
    theme: {
      shape: { borderRadius }
    }
  }) => css`
    .MuiPaper-root {
      border-radius: ${borderRadius}rem;
    }
  `
)

const StyledAvatar = styled(Avatar)`
  cursor: pointer;
`

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
)

export const AuthProvider = ({ children }) => {
  const [isUserLoading, setIsUserLoading] = useState(true)
  const [authUser, setAuthUser] = useState<AuthUser | null>(null)
  const [registerError, setRegisterError] = useState<string | null>(null)
  const [loginError, setLoginError] = useState<string | null>(null)
  const [anchorElement, setAnchorElement] = useState<HTMLButtonElement | null>(
    null
  )

  const {
    writeUser,
    fetchUser,
    clearUser,
    user,
    deleteUser: deleteUserData
  } = useContext(DataContext)
  const { onEnqueueSnackbar } = useContext(SnackbarContext)
  const { deleteAsset } = useContext(StorageContext)

  const navigate = useNavigate()
  const { t } = useTranslation()

  useEffect(() => {
    const unlisten = onAuthStateChanged(auth, user => {
      setIsUserLoading(true)

      if (user) {
        setAuthUser(user)
        fetchUser(user.uid)
      }

      setIsUserLoading(false)
    })

    return () => {
      unlisten()
    }
  }, [fetchUser])

  useEffect(() => {
    let timeOut

    if (loginError || registerError) {
      timeOut = setTimeout(() => {
        setRegisterError(null)
        setLoginError(null)
      }, 5000)
    }

    return () => {
      clearTimeout(timeOut)
    }
  }, [registerError, loginError])

  const register = (props: RegisterProps) => {
    const { email, forename, surname, tel, password, dob } = props

    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        setAuthUser(userCredential.user)

        writeUser({
          id: userCredential.user.uid,
          email,
          forename,
          surname,
          tel,
          dob
        })

        onEnqueueSnackbar(t('shared.welcome'), 'success')

        navigate('/prs')
      })
      .catch(error => {
        switch (error.code) {
          case 'auth/email-already-in-use':
            setRegisterError('Email already registered.')
            break

          default:
            setRegisterError('Error with registation.')
            break
        }
      })
  }

  const login = (email: string, password: string, params?: string) => {
    // Note: "Login" prefered. Logging in suggests one has already signed up...

    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        setAuthUser(userCredential.user)
        setAnchorElement(null)

        navigate(`/prs`, { replace: true })
      })
      .catch(error => {
        switch (error.code) {
          case 'auth/wrong-password':
            setLoginError('Incorrect email or password.')
            break
          case 'auth/too-many-requests':
            setLoginError(
              'Too many incorrect log in attempts. Please try again later or reset password.'
            )
            break
          default:
            setLoginError('Error with Login.')
            break
        }
      })
  }

  const deleteUser = async () => {
    if (user && authUser) {
      setIsUserLoading(true)
      // TODO move to data context
      user.avatarSrc && deleteAsset({ fileName: user.avatarSrc })
      await deleteUserData()
      await deleteUserAuth(authUser)
      setIsUserLoading(false)
    }
  }

  const updatePassword = async (oldPassword: string, newPassword: string) => {
    setIsUserLoading(true)

    try {
      if (authUser && authUser.email) {
        const credential = EmailAuthProvider.credential(
          authUser.email,
          oldPassword
        )

        await reauthenticateWithCredential(authUser, credential)
        await updateAuthPassword(authUser, newPassword)

        onEnqueueSnackbar(t('success.passwordUpdated'), 'success')
        setIsUserLoading(false)
      }
    } catch (e) {
      setIsUserLoading(false)
      return null
    }
  }

  const updateEmail = async (newEmail: string, password: string) => {
    try {
      if (authUser && authUser.email) {
        const credential = EmailAuthProvider.credential(
          authUser.email,
          password
        )

        await reauthenticateWithCredential(authUser, credential)
        await updateAuthEmail(authUser, newEmail)

        onEnqueueSnackbar(t('success.emailUpdated'), 'success')
      }
    } catch (e) {
      return null
    }
  }

  const logout = async () => {
    setAnchorElement(null)

    await signOut(auth)
    setAuthUser(null)
    clearUser()
    navigate('/')
  }

  const handleLogInCick = async () => navigate('/login')

  const handleAccountClick = () => {
    navigate('/prs')
    handleClose()
  }

  const handleProfileClick = () => {
    navigate('/profile')
    handleClose()
  }

  const handleClick = (event: any) => {
    setAnchorElement(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorElement(null)
  }

  const handleClearError = () => {
    setLoginError(null)
    setRegisterError(null)
  }

  return (
    <AuthContext.Provider
      value={{
        authUser,
        register,
        login,
        logout,
        deleteUser,
        isUserLoading,
        registerError,
        loginError,
        clearError: handleClearError,
        updatePassword,
        updateEmail
      }}
    >
      <AuthWrapper>
        {authUser ? (
          <Wrapper>
            {anchorElement && (
              <StyledPopover
                open={Boolean(anchorElement)}
                anchorEl={anchorElement}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left'
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left'
                }}
              >
                <Box>
                  <List>
                    <ListItem disablePadding>
                      <ListItemButton onClick={handleAccountClick}>
                        <ListItemIcon>
                          <DnsIcon />
                        </ListItemIcon>
                        <ListItemText primary='PRs' />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton onClick={handleProfileClick}>
                        <ListItemIcon>
                          <AccountCircleIcon />
                        </ListItemIcon>
                        <ListItemText primary={t('shared.profile')} />
                      </ListItemButton>
                    </ListItem>
                  </List>
                  <Divider />
                  <List>
                    <ListItem>
                      <Button
                        onClick={logout}
                        variant='contained'
                        fullWidth
                        startIcon={<LogoutOutlinedIcon />}
                      >
                        {t('shared.logout')}
                      </Button>
                    </ListItem>
                  </List>
                </Box>
              </StyledPopover>
            )}
          </Wrapper>
        ) : (
          <IconButton
            aria-label='log in'
            component='label'
            onClick={handleLogInCick}
          >
            <LoginOutlinedIcon color='primary' />
          </IconButton>
        )}
        {user && (
          <StyledAvatar onClick={handleClick} src={user.avatarSrc}>{`${
            Array.from(user.forename)[0]
          }${Array.from(user.surname)[0]}`}</StyledAvatar>
        )}
      </AuthWrapper>
      {children}
    </AuthContext.Provider>
  )
}

export const AuthConsumer = AuthContext.Consumer
