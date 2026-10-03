import './style.css'

const canvas = document.createElement('canvas')
canvas.width = 600
canvas.height = 600

document.body.appendChild(canvas)

const ctx = canvas.getContext('2d')

if (ctx) {
  // Draw a green square at the center of the canvas
  ctx.fillStyle = 'lime'
  ctx.fillRect(300, 300, 30, 30)
}