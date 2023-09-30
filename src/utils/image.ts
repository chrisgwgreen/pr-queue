export const loadImage = (setImageDimensions, imageUrl) => {
  const img = new Image()
  img.src = imageUrl

  img.onload = () => {
    setImageDimensions({
      height: img.height,
      width: img.width
    })
  }
  img.onerror = err => {
    console.error(err)
  }
}
