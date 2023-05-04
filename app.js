let startBtn = document.querySelector('#start')
let screens = document.querySelectorAll('.screen')
let tineList = document.querySelector('#time-list')
let timeEl = document.querySelector('#time')
let board = document.querySelector('#board')
let time = 0
let score = 0
let colors = ['#e74c3c', '#8e44ad', '#3498db', '#e67e22', '#2ecc71', '#429ce0', '#2f0990', '#90093f', '#900909', '#9a0795']

startBtn.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
})

tineList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')){
        time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
})

board.addEventListener('click', event => {
    if(event.target.classList.contains('circle')) {
            score++
            event.target.remove()
            createRandomCircle()
        }
})

function startGame() {
    setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time)
}

function decreaseTime() {
    if (time === 0) {
        finishGame()
    } else {
        let current = --time
        if (current < 10) {
            current = `0${current}`
        }
        setTime(current)
    }
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function finishGame() {
    timeEl.parentNode.classList.add('hide')
    board.innerHTML = `<h1>Счёт: <span class="primary">${score}</span></h1>`
}

function createRandomCircle() {
    let circle = document.createElement('div')
    let size = getRandomNumber(10, 60)
    let {width, height} = board.getBoundingClientRect()
    let x = getRandomNumber(0, width - size)
    let y = getRandomNumber(0, height - size)
    let color = getRandomColor()

    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    circle.style.background = color
    
    board.append(circle)
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function getRandomColor() {
    let index = Math.floor(Math.random() * colors.length)
    return colors[index]
  }