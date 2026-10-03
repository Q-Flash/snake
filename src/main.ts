import './style.css'

const canvas = document.createElement('canvas')
canvas.width = 600
canvas.height = 600

document.body.appendChild(canvas)

const ctx = canvas.getContext('2d')

let x = 300
const y = 300


function draw() {
  if (!ctx) {
    return
  }

  // Clear the canvas before drawing the new frame
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // Draw a green square at the center of the canvas
  ctx.fillStyle = 'lime'
  ctx.fillRect(x, y, 30, 30)

  x += 30
}

// Call the draw function every 500 milliseconds to animate the square
setInterval(draw, 500)
