export interface Category {
  src: string
}

export interface Image {
  src: string
  width: number
  height: number
  fileName: string
  title?: string
  alt?: string
}

export interface CardBanner {
  id: string
  title: string
  duration: number
  delay: number
  isBold?: boolean
  isShowTitle?: boolean
}

export interface Message {
  text: string
  signature: string
}

export interface Reaction {
  videoUrl?: string
  gifUrl?: string
}

export interface Card {
  messageTo: string
  author: string
  theme: string
  date: number
  seatView: string
  message: Message
  banner: CardBanner[]
  gallery: Image[]
  reaction: Reaction
  isReactionBanned: boolean
  area: string
  seat: string
  showDate: number
  openedDate: number
  pin: number
}

export interface CardDetails {
  id: string
  card: Card
}

export interface Show {
  title: string
  icon: string
  logo: string
  video: string
  parallaxOne: string
  parallaxTwo: string
  poster: string
  spotifyPlaylist: string
  bookLink: string
  infoLink: string
  isActive: boolean
  location: string
  theatreName: string
}

export interface CreateImageImgProps {
  src: string
  width: number
  height: number
  fileName: string
  title: string
}

export interface CreateImageProps {
  file: any
  callback?: (img: CreateImageImgProps) => void
  title?: string
}

export interface CreateProfileImage {
  file: any
  callback?: (url: string) => void
}

export interface RemoveProfileImage {
  file: any
}

export interface CreateVideoProps {
  file: any
}

export interface CreateGifProps {
  file: any
}

export interface DeleteAssetProps {
  fileName: string
  onSuccess?: () => void
  onError?: (error: any) => void
}

export interface CreateSignatureProps {
  file: string
  callback?: (url: string) => void
}

export interface CreateGIFProps {
  file: Blob
  frameRateMillis?: number
  quality?: number
  sizeRatio?: number
}

export interface StorageContextProps {
  createImage: (props: CreateImageProps) => void
  createVideo: (props: CreateVideoProps) => Promise<string>
  createGIF: (props: CreateGifProps) => Promise<string>
  createSignature: (props: CreateSignatureProps) => void
  deleteAsset: (props: DeleteAssetProps) => void
}

export type ThemeColorType = 'primary' | 'secondary'

export interface User {
  id?: string
  forename: string
  surname: string
  email: string
  avatarSrc?: string
  tel?: string
  dob?: number
  adminLevel?: number
}

export interface Register extends User {
  password: string
}

export interface UpdateShowTheme {
  cardId: string
  theme: string
}

export interface UpdateRecipient {
  cardId: string
  name: string
}

export interface HTMLImage {
  src: string
  alt?: string
}

export interface HomePage {
  reactionOne: string
  reactionTwo: string
  reactionThree: string
  reactionFour: string
  reactionFive: string
  envelopeItemOne: string
  envelopeItemTwo: string
  envelopeItemThree: string
}

export type Page = HomePage

export interface Translation {
  [id: string]: string
}

export interface Translations {
  [id: string]: Translation
}

export interface SelectedItem {
  index: number
  category: string
}

export interface Flags {
  index: number
  category: string
}

export type Priority = 2 | 1 | 0

export interface Ticket {
  id?: string
  column: string
  order: number
  title: string
  prUrl: string
  userId: string
  priority: Priority
}
