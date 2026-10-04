import './style.css'

const scoreDisplay = document.createElement('div')
scoreDisplay.textContent = 'Score: 0'
scoreDisplay.style.color = 'white'
scoreDisplay.style.fontSize = '24px'
scoreDisplay.style.marginBottom = '12px'
document.body.appendChild(scoreDisplay)

const gameOverDisplay = document.createElement('div')
gameOverDisplay.textContent = ''
gameOverDisplay.style.color = 'white'
gameOverDisplay.style.fontSize = '28px'
gameOverDisplay.style.marginTop = '12px'
document.body.appendChild(gameOverDisplay)

const restartButton = document.createElement('button')
restartButton.textContent = 'Restart'
restartButton.style.display = 'none'
restartButton.style.marginTop = '12px'
restartButton.style.fontSize = '18px'
restartButton.style.padding = '8px 16px'
document.body.appendChild(restartButton)

restartButton.addEventListener('click', restartGame)

const canvas = document.createElement('canvas')
canvas.width = 600
canvas.height = 600

document.body.appendChild(canvas)

const ctx = canvas.getContext('2d')

let snake = [
  { x: 300, y: 300 },
  { x: 270, y: 300 },
  { x: 240, y: 300 },
]

let score = 0

let dx = 30
let dy = 0

let food = {
  x: 450,
  y: 300,
}

function restartGame() {
  snake = [
    { x: 300, y: 300 },
    { x: 270, y: 300 },
    { x: 240, y: 300 },
  ]

  dx = 30
  dy = 0

  food = {
    x: 450,
    y: 300,
  }

  score = 0
  scoreDisplay.textContent = 'Score: 0'

  gameOverDisplay.textContent = ''
  restartButton.style.display = 'none'

  gameLoop = setInterval(draw, 150)
}

function draw() {
  if (!ctx) {
    return
  }

  // Clear the canvas before drawing the new frame
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // Draw a green square at the center of the canvas
  ctx.fillStyle = 'lime'

  // Draw each segment of the snake
  for (const segment of snake) {
    ctx.fillRect(segment.x, segment.y, 30, 30)
  }

  // Calculate the new head position based on the current direction
  const head = snake[0]

  // Create a new head based on the current direction
  const newHead = {
    x: head.x + dx,
    y: head.y + dy,
  }

  const hitWall =
    newHead.x < 0 ||
    newHead.x >= canvas.width ||
    newHead.y < 0 ||
    newHead.y >= canvas.height
  
  const hitSelf = snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)

  if (hitWall || hitSelf) {
    clearInterval(gameLoop)
    gameOverDisplay.textContent = 'Game Over'
    restartButton.style.display = 'block'
    return
  }

  // Check if the snake has eaten the food
  const ateFood =
  newHead.x === food.x &&
  newHead.y === food.y

  // Add the new head to the beginning of the snake array and remove the last segment to simulate movement
  // Don't remove the last segment if the snake has eaten the food
  snake.unshift(newHead)
  if (!ateFood) {
    snake.pop()
  } 
  else {
    // Increase the score when the snake eats the food
    score += 1

    // Update the score display
    scoreDisplay.textContent = `Score: ${score}`

    // Generate new food position
    food = {
      x: Math.floor(Math.random() * 20) * 30,
      y: Math.floor(Math.random() * 20) * 30,
    }
  }

  // Draw the food
  ctx.fillStyle = 'red'
  ctx.fillRect(food.x, food.y, 30, 30)
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
let gameLoop = setInterval(draw, 150)
