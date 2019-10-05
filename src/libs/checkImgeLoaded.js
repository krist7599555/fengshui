export default function checkImageLoaded(url) {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img')
    img.addEventListener('load', () => {
      resolve()
    })
    img.src = 'img/bg1.webp'
  })
}
