const btn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')

const colors = ['#0070f0', '#00d9ff', '#781669', '#08ff08', '#e9fa00', '#ff3300', '#ff00bb', '#00ff9d']

let time = 0
let score = 0

btn.addEventListener('click', (e) => {
    e.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', e => {
    if(e.target.classList.contains('time-btn')) {
       time = parseInt(e.target.getAttribute('data-time'))
    }
    screens[1].classList.add('up')
    startGame()
})

board.addEventListener('click', e => {
    if(e.target.classList.contains('circle')) {
        score++
        e.target.remove()
        createRandomCircle()
    }
})

function startGame() {
    setInterval(decreaseTime, 1000)
    setTime(time)
    createRandomCircle()
}

function decreaseTime() {
    if(time === 0) {
        finishGame()
    } else {
        let current = --time
        if(current < 10) current = `0${current}`
        setTime(current)
    }
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function finishGame() {
    timeEl.parentNode.classList.add('hide')
    board.innerHTML = `<h1><span class="primary">Count: ${score}</span></h1>`
}

function createRandomCircle() {
    const circle = document.createElement('div')
    const size = getRandomNumber(10, 60)
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)
    const color = getRandomColor()

    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    circle.style.background = color
    board.append(circle)
}

function getRandomNumber(min, max) {
   return  Math.round(Math.random() * (max - min) + min)
}

function getRandomColor() {
    const index = Math.floor(Math.random()*8)
    return colors[index]
}