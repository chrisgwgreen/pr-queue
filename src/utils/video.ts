type format = 'ogg' | 'h264' | 'webm' | 'vp9' | 'hls'

export const supportsVideoType = (type: format) => {
  const formats = {
    ogg: 'video/ogg; codecs="theora"',
    h264: 'video/mp4; codecs="avc1.42E01E"',
    webm: 'video/webm; codecs="vp8, vorbis"',
    vp9: 'video/webm; codecs="vp9"',
    hls: 'application/x-mpegURL; codecs="avc1.42E01E"'
  }

  const video = document.createElement('video')
  return video.canPlayType(formats[type] || type) === 'probably'
}
