import { createContext, useContext, useCallback } from 'react'
import {
  getStorage,
  ref,
  uploadString,
  uploadBytes,
  getDownloadURL,
  deleteObject
} from 'firebase/storage'
import { useTranslation } from 'react-i18next'
import { SnackbarContext, LoadingContext } from 'contexts'
import Resizer from 'react-image-file-resizer'
import { v4 as uuidv4 } from 'uuid'
import GIF from 'gif.js'
import {
  StorageContextProps,
  CreateImageProps,
  CreateVideoProps,
  CreateSignatureProps,
  DeleteAssetProps,
  CreateGIFProps
} from 'types'

const storage = getStorage()

export const StorageContext = createContext<StorageContextProps>(
  {} as StorageContextProps
)

export const StorageProvider = ({ children }) => {
  const { onEnqueueSnackbar } = useContext(SnackbarContext)
  const { setIsStorageLoading } = useContext(LoadingContext)

  const { t } = useTranslation()

  const createImage = (props: CreateImageProps) => {
    const { file, callback, title = '' } = props

    try {
      const fileName = `${uuidv4()}.jpg`
      Resizer.imageFileResizer(
        file,
        300,
        300,
        'JPEG',
        80,
        0,
        uri => {
          const storageRef = ref(storage, fileName)
          const metadata = {
            cacheControl: 'public,max-age=400000'
          }

          uploadString(storageRef, uri as string, 'data_url', metadata).then(
            snapshot => {
              getDownloadURL(snapshot.ref).then(async url => {
                const img = new Image()
                img.onload = async () => {
                  const { naturalWidth: width, naturalHeight: height } = img

                  callback &&
                    callback({
                      src: url,
                      width,
                      height,
                      fileName,
                      title
                    })
                }
                img.src = url
              })
            }
          )
        },
        'base64',
        300,
        300
      )
    } catch (error) {
      console.log(error)
      onEnqueueSnackbar(JSON.stringify(error), 'error')
    }
  }

  const createGIF = (props: CreateGIFProps) =>
    new Promise<string>((resolve, reject) => {
      const {
        file,
        frameRateMillis = 250,
        quality = 7,
        sizeRatio = 0.3
      } = props

      let gif: GIF
      let currentTime = 0

      if (typeof Worker === 'undefined') {
        onEnqueueSnackbar(t('error.unableToCreateGIF'), 'error')
        reject('Workers not available')
      }

      setIsStorageLoading(true)

      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      const video = document.createElement('video')
      const videoUrl = URL.createObjectURL(file)

      video.addEventListener(
        'loadedmetadata',
        function () {
          let height = this.videoHeight * sizeRatio
          let width = this.videoWidth * sizeRatio

          canvas.width = width
          canvas.height = height

          gif = new GIF({
            workers: 2,
            workerScript: process.env.PUBLIC_URL + '/gif.worker.js',
            quality,
            width,
            height
          })

          gif.on('finished', function (blob) {
            try {
              const fileName = `${uuidv4()}.gif`
              const storageRef = ref(storage, fileName)
              const metadata = {
                cacheControl: 'public,max-age=400000'
              }
              uploadBytes(storageRef, blob, metadata).then(snapshot => {
                getDownloadURL(snapshot.ref).then(async gifUrl => {
                  resolve(gifUrl)
                  setIsStorageLoading(false)
                })
              })
            } catch (error) {
              onEnqueueSnackbar(JSON.stringify(error), 'error')
              setIsStorageLoading(false)
              reject({ error })
            }
          })

          video.addEventListener('seeked', function () {
            if (ctx) {
              ctx.drawImage(video, 0, 0, width, height)
              gif.addFrame(ctx, { copy: true, delay: frameRateMillis })

              if (currentTime + 1 < video.duration) {
                currentTime = currentTime + frameRateMillis / 1000
                video.currentTime = currentTime
              } else {
                gif.render()
              }
            }
          })
        },
        false
      )

      video.src = videoUrl
      video.currentTime = frameRateMillis / 1000
    })

  const createVideo = (props: CreateVideoProps) =>
    new Promise<string>((resolve, reject) => {
      const { file } = props
      setIsStorageLoading(true)

      try {
        const fileName = `${uuidv4()}.webm`
        const storageRef = ref(storage, fileName)
        const metadata = {
          cacheControl: 'public,max-age=400000'
        }
        uploadBytes(storageRef, file, metadata).then(snapshot => {
          getDownloadURL(snapshot.ref).then(async videoUrl => {
            setIsStorageLoading(false)
            resolve(videoUrl)
          })
        })
      } catch (error) {
        onEnqueueSnackbar(JSON.stringify(error), 'error')
        setIsStorageLoading(false)
        reject({ error })
      }
    })

  const createSignature = (props: CreateSignatureProps) => {
    const { file, callback } = props

    try {
      const fileName = `${uuidv4()}.jpg`
      const storageRef = ref(storage, fileName)
      const metadata = {
        cacheControl: 'public,max-age=400000'
      }
      uploadString(storageRef, file, 'data_url', metadata).then(snapshot => {
        getDownloadURL(snapshot.ref).then(async url => {
          callback && callback(url)
        })
      })
    } catch (error) {
      onEnqueueSnackbar(JSON.stringify(error), 'error')
    }
  }

  const deleteAsset = useCallback((props: DeleteAssetProps) => {
    const { fileName, onSuccess, onError } = props
    const deleteRef = ref(storage, fileName)

    return deleteObject(deleteRef).then(onSuccess).catch(onError)
  }, [])

  return (
    <StorageContext.Provider
      value={{
        createImage,
        createVideo,
        createGIF,
        createSignature,
        deleteAsset
      }}
    >
      {children}
    </StorageContext.Provider>
  )
}

export const StorageConsumer = StorageContext.Consumer
