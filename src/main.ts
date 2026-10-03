import './style.css'

const canvas = document.createElement('canvas')
canvas.width = 600
canvas.height = 600

document.body.appendChild(canvas)

const ctx = canvas.getContext('2d')

let x = 300
let y = 300

let dx = 30
let dy = 0

function draw() {
  if (!ctx) {
    return
  }

  // Clear the canvas before drawing the new frame
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // Draw a green square at the center of the canvas
  ctx.fillStyle = 'lime'
  ctx.fillRect(x, y, 30, 30)

  x += dx
  y += dy
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowUp') {
    dx = 0
    dy = -30
  }

  if (event.key === 'ArrowDown') {
    dx = 0
    dy = 30
  }

  if (event.key === 'ArrowLeft') {
    dx = -30
    dy = 0
  }

  if (event.key === 'ArrowRight') {
    dx = 30
    dy = 0
  }
})


// Call the draw function every 500 milliseconds to animate the square
setInterval(draw, 150)
