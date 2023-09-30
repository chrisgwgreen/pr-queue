import { getAnalytics } from 'firebase/analytics'
import { initializeApp } from 'firebase/app'
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  updateDoc,
  where
} from 'firebase/firestore'
import { createContext, useCallback, useContext, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
import { LoadingContext, SnackbarContext, StorageContext } from 'contexts'
import { useTranslation } from 'react-i18next'
import { Priority, Ticket, User } from 'types'
import { v4 as uuidv4 } from 'uuid'

interface DataContextProps {
  // User...
  writeUser: (props: User) => void
  fetchUser: (userId: string) => void
  fetchTicketUser: (userId: string) => Promise<User>
  deleteUser: () => Promise<any>
  clearUser: () => void
  writeAvatar: (file: any, callback?: () => void) => void
  updateName: (forename: string, surname: string) => void
  updateEmail: (email: string) => void
  user: User | null

  // Ticket...
  fetchTickets: () => void
  updateTicketOrder: (id: string, order: number, column: string) => void
  deleteTicket: (id: string) => void
  updateTicketPriority: (id: string, priority: Priority) => void
  writeTicket: (title: string, prUrl: string, callback?: () => void) => void
  tickets: Ticket[] | null
}

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASUREMENTID
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

getAnalytics(app)

export const DataContext = createContext<DataContextProps>(
  {} as DataContextProps
)

export const DataProvider = ({ children }) => {
  const [tickets, setTickets] = useState<Ticket[] | null>(null)
  const [user, setUser] = useState<User | null>(null)

  const { createImage, deleteAsset } = useContext(StorageContext)
  const { onEnqueueSnackbar } = useContext(SnackbarContext)
  const { setIsDataLoading } = useContext(LoadingContext)

  const { t } = useTranslation()

  const writeUser = useCallback(
    async (props: User) => {
      const { id, email, forename, surname, tel, dob } = props
      setIsDataLoading(true)

      let user: User = {
        id,
        email,
        forename,
        surname
      }

      if (tel) user = { ...user, tel }
      if (dob) user = { ...user, dob }

      id && (await setDoc(doc(db, 'users', id), user))

      setIsDataLoading(false)
    },
    [setIsDataLoading]
  )

  const fetchUser = useCallback(
    async (userId: string) => {
      if (!user) {
        setIsDataLoading(true)

        const docRef = doc(db, 'users', userId)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          docSnap && setUser(docSnap.data() as User)
        } else {
          onEnqueueSnackbar(t('error.fetchUser'), 'error')
        }

        setIsDataLoading(false)
      }
    },
    [onEnqueueSnackbar, setIsDataLoading, t, user]
  )

  const fetchTicketUser = useCallback(async (userId: string) => {
    const docRef = doc(db, 'users', userId)
    const docSnap = await getDoc(docRef)

    return docSnap.data() as User
  }, [])

  const writeAvatar = useCallback(
    async (file: any, callback?: () => void) => {
      if (user) {
        setIsDataLoading(true)
        user.avatarSrc && deleteAsset({ fileName: user?.avatarSrc })

        createImage({
          file,
          callback(img) {
            if (user?.id) {
              const docRef = doc(db, 'users', user?.id)

              updateDoc(docRef, {
                avatarSrc: img.src
              }).then(() => {
                user.id && fetchUser(user.id)
                onEnqueueSnackbar(t('success.avatarUpdated'), 'success')
                callback && callback()
                setIsDataLoading(false)
              })
            }
          }
        })
      }
    },
    [
      onEnqueueSnackbar,
      t,
      fetchUser,
      createImage,
      deleteAsset,
      user,
      setIsDataLoading
    ]
  )

  const deleteUser = useCallback(async () => {
    if (user?.id) {
      setIsDataLoading(true)

      const docRef = collection(db, 'cards')

      // Clear Created Cards
      const createdCards = query(docRef, where('author', '==', user?.id))

      const createdCardsSnapshot = await getDocs(createdCards)

      createdCardsSnapshot.forEach(
        async card => await updateDoc(card.ref, { author: null })
      )

      // TODO remove unopened created cards?...

      // Clear Received Cards
      const receivedCardsQuery = query(
        docRef,
        where('recipient', '==', user?.id)
      )
      const receivedCardsSnapshot = await getDocs(receivedCardsQuery)

      receivedCardsSnapshot.forEach(
        async card => await updateDoc(card.ref, { recipient: null })
      )

      // Delete user
      await deleteDoc(doc(db, 'users', user.id))

      setIsDataLoading(false)
    }
  }, [user, setIsDataLoading])

  const updateName = useCallback(
    async (forename: string, surname: string) => {
      if (user && user?.id) {
        const docRef = doc(db, 'users', user?.id)

        updateDoc(docRef, {
          forename,
          surname
        })
          .then(() => {
            user.id && fetchUser(user.id)
            onEnqueueSnackbar(t('success.nameUpdated'), 'success')
          })
          .catch(() => {
            onEnqueueSnackbar(t('error.unableToUpdateDetails'), 'error')
          })
      }
    },
    [fetchUser, onEnqueueSnackbar, t, user]
  )

  const updateEmail = useCallback(
    async (email: string) => {
      if (user && user?.id) {
        const docRef = doc(db, 'users', user.id)

        updateDoc(docRef, {
          email
        })
          .then(() => {
            user.id && fetchUser(user.id)
            onEnqueueSnackbar(t('success.emailUpdated'), 'success')
          })
          .catch(() => {
            onEnqueueSnackbar(t('error.unableToUpdateDetails'), 'error')
          })
      }
    },
    [fetchUser, user, onEnqueueSnackbar, t]
  )

  const clearUser = useCallback(async () => {
    setIsDataLoading(true)
    setUser(null)
    onEnqueueSnackbar(t('success.loggedOut'), 'success')
    setIsDataLoading(false)
  }, [onEnqueueSnackbar, t, setIsDataLoading])

  const fetchTickets = useCallback(async () => {
    setIsDataLoading(true)

    const querySnapshot = await getDocs(collection(db, 'tickets'))

    const tickets: Ticket[] = []

    querySnapshot.forEach(doc =>
      tickets.push({ ...(doc.data() as Ticket), id: doc.id })
    )

    setTickets(tickets)

    setIsDataLoading(false)
  }, [setIsDataLoading])

  const writeTicket = useCallback(
    async (title: string, prUrl: string, callback?: () => void) => {
      if (user?.id) {
        const id = uuidv4()

        const max =
          tickets && tickets.length > 0
            ? Math.max(
                ...tickets
                  .filter(ticket => ticket.column === 'dev')
                  .map(ticket => ticket.order)
              )
            : 0

        await setDoc(doc(db, 'tickets', id), {
          id,
          column: 'dev',
          title,
          prUrl,
          order: max + 1,
          userId: user.id,
          priority: 0
        }).then(() => {
          onEnqueueSnackbar('Ticket added', 'success')
          callback && callback()
          setIsDataLoading(false)
        })
      }
    },
    [onEnqueueSnackbar, user, setIsDataLoading, tickets]
  )

  const deleteTicket = useCallback(
    async (id: string, callback?: () => void) => {
      setIsDataLoading(true)
      await deleteDoc(doc(db, 'tickets', id)).then(() => {
        onEnqueueSnackbar('Ticket deleted', 'success')
        callback && callback()
        setIsDataLoading(false)
      })
    },
    [onEnqueueSnackbar, setIsDataLoading]
  )

  const updateTicketOrder = useCallback(
    async (id: string, order: number, column: string) => {
      const docRef = doc(db, 'tickets', id)

      updateDoc(docRef, {
        order,
        column
      }).then(() => {
        if (tickets) {
          const newTickets = [...tickets]
          const index = newTickets.findIndex(ticket => ticket.id === id)

          newTickets[index].order = order
          newTickets[index].column = column

          setTickets(newTickets)
        }

        setIsDataLoading(false)
      })
    },
    [tickets, setIsDataLoading]
  )

  const updateTicketPriority = useCallback(
    async (id: string, priority: Priority) => {
      const docRef = doc(db, 'tickets', id)

      updateDoc(docRef, {
        priority
      }).then(() => {
        if (tickets) {
          const newTickets = [...tickets]
          const index = newTickets.findIndex(ticket => ticket.id === id)

          newTickets[index].priority = priority

          setTickets(newTickets)
        }
      })
    },
    [tickets]
  )

  return (
    <DataContext.Provider
      value={{
        // User...
        writeUser,
        fetchUser,
        fetchTicketUser,
        deleteUser,
        clearUser,
        writeAvatar,
        updateName,
        updateEmail,
        user,

        // Tickets...
        fetchTickets,
        updateTicketOrder,
        updateTicketPriority,
        writeTicket,
        deleteTicket,

        tickets
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export const DataConsumer = DataContext.Consumer
