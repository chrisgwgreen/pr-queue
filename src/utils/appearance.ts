export const getBrowserAppearance = () => {
  if (
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme:dark)').matches
  ) {
    return 'dark'
  } else {
    return 'light'
  }
}
