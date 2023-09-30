export const generatePin = () => Math.floor(1000 + Math.random() * 9000)

export const clamp = (num: number, min: number, max: number) =>
  Math.min(Math.max(num, min), max)
