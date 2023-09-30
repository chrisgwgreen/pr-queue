export const getParameterByName = (name: string) => {
  name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]')

  const regexS = '[\\?&]' + name + '=([^&#]*)'
  const regex = new RegExp(regexS)
  const results = regex.exec(window.location.href)

  if (results == null) return ''

  return decodeURIComponent(results[1].replace(/\+/g, ' '))
}
