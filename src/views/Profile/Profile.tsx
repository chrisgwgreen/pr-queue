import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography
} from '@mui/material'
import { styled } from '@mui/system'
import { Avatar, Dialog, HTMLTitle, MarginWrapper } from 'components'
import { AuthContext, DataContext } from 'contexts'
import { ChangeEmail, ChangeName, ChangePassword } from 'forms'
import { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'

const Wrapper = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 2rem;
`

const DetailsWrapper = styled('div')`
  margin-top: 2rem;
  width: 100%;
  text-align: center;
`

const AccordionWrapper = styled('div')`
  margin: 2rem 0;
`

export const Profile = () => {
  const [isDeleteAccountVisible, setIsDeleteAccountVisible] = useState(false)

  const {
    deleteUser,
    updatePassword,
    updateEmail: updateAuthEmail
  } = useContext(AuthContext)
  const { user, writeAvatar, updateName, updateEmail } = useContext(DataContext)

  const { t } = useTranslation()

  const handleUpdateAvatar = async (
    imageUrl: string,
    callback?: () => void
  ) => {
    fetch(imageUrl).then(async res => {
      const file = await res.blob()

      writeAvatar(file, callback)
    })
  }

  const handleDeleteAccount = () => deleteUser()
  const handleChangeEmail = (email: string, password: string) => {
    updateAuthEmail(email, password)
    updateEmail(email)
  }
  const handleChangePassword = (oldPassword: string, newPassword: string) =>
    updatePassword(oldPassword, newPassword)

  const handleChangeName = (forename: string, surname: string) => {
    updateName(forename, surname)
  }

  return (
    <>
      <HTMLTitle title='Profile' />
      <MarginWrapper>
        <Wrapper>
          {isDeleteAccountVisible && (
            <Dialog
              title={t('account.deleteAccountTitle')}
              copy={t('account.deleteAccountSubtitle')}
              onSubmit={handleDeleteAccount}
              onCancel={() => setIsDeleteAccountVisible(false)}
            />
          )}
          <Avatar onUpdateAvatar={handleUpdateAvatar} src={user?.avatarSrc} />
          {user && (
            <DetailsWrapper>
              <Typography>{`${user.forename} ${user.surname}`}</Typography>
              <Typography>{`${user.email}`}</Typography>
              <AccordionWrapper>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls='change name'
                  >
                    <Typography>{t('account.changeName')}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <ChangeName
                      forename={user.forename}
                      surname={user.surname}
                      onSubmit={handleChangeName}
                      error=''
                      onClearError={() => {}}
                    />
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls='change email'
                  >
                    <Typography>{t('account.changeEmail')}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <ChangeEmail
                      onSubmit={handleChangeEmail}
                      error=''
                      onClearError={() => {}}
                    />
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls='change password'
                  >
                    <Typography>{t('account.changePassword')}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <ChangePassword
                      onSubmit={handleChangePassword}
                      error=''
                      onClearError={() => {}}
                    />
                  </AccordionDetails>
                </Accordion>
              </AccordionWrapper>
            </DetailsWrapper>
          )}
          <Button onClick={() => setIsDeleteAccountVisible(true)}>
            {t('account.deleteAccountTitle')}
          </Button>
        </Wrapper>
      </MarginWrapper>
    </>
  )
}
