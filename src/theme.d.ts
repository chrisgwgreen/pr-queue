// eslint-disable-next-line
import { PaletteOptions } from '@mui/material/styles/createPalette'

declare module '@mui/material/styles/createPalette' {
  export interface PaletteOptions {
    tertiary?: {
      main: string
    }
    gradient?: {
      primary?: string
      secondary?: string
      tertiary?: string
      quaternary?: string
    }
    envelope?: {
      foldFill: string
      sideFill: string
      bottomFill: string
    }
    cardBanner?: {
      color: string // Color of the title text
      editorColor: string // Color of the editor text
      editorItemBackground: string // Background color of the sortable items
    }
    titleBlock?: {
      color: string
      background: string
    }
    logo?: {
      color: string
    }
  }
}
