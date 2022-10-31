let radius = 250
const body = document.querySelector('.body')
const controllRadius = document.querySelector('#radius')
let centerX = body.style.height.slice(0, -2) / 2 + 100
let centerY = body.style.width.slice(0, -2) / 2

function makeComponent(N, inner, startX, startY, R) {
  let parentComp
  let zStart
  let compNum
  const firstComp = document.querySelector('#comp1')
  firstComp.style.zIndex = N
  if (inner) {
    parentComp = document.querySelector('#comp1')
    compNum = Math.floor(N / 2 + 1)
    zStart = N
    console.log(`inner의 결과 ${N}, ${zStart}`)
  } else {
    parentComp = document.querySelector('.body')
    compNum = N
    zStart = 0
  }
  const curCenX = centerX - startX
  const curCenY = centerY - startY
  console.log(`현재 세로, 가로 ${curCenX}, ${curCenY}`)
  for (let n = 1; n < compNum; n++) {
    const compBox = document.createElement('div')
    const PI = Math.PI
    const THETA = (2 * PI * n) / N
    const boxColor = `rgba(${n * 30 + 100},${(n * 10) % 255},${(n * 10) % 255})`
    compBox.setAttribute('class', 'comp')
    const curX = curCenX - R * Math.cos(THETA) - 120
    const curY = curCenY + R * Math.sin(THETA) - 80
    console.log(curX)
    console.log(curY)
    compBox.style.postion = 'absolute'
    compBox.style.left = `${curY}px`
    compBox.style.top = `${curX}px`
    compBox.style.transform = `rotate(${THETA}rad)`
    compBox.style.backgroundColor = boxColor
    compBox.style.zIndex = zStart + n
    console.log('만들어진 박스')
    console.log(compBox)
    parentComp.append(compBox)
  }
}

function getComp1Position(R) {
  let comp1X = centerX - R - 120
  let comp1Y = centerY - 80
  console.log(`첫 박스 x,y 는 ${comp1X}, ${comp1Y}`)
  return [comp1X, comp1Y]
}

let [comp1X, comp1Y] = getComp1Position(radius)
const comp1 = document.querySelector('#comp1')
comp1.style.left = `${comp1Y}px`
comp1.style.top = `${comp1X}px`

makeComponent(20, false, 0, 0, radius)
makeComponent(20, true, comp1X, comp1Y, radius)

controllRadius.addEventListener('input', (e) => {
  radius = e.target.value
  const bodyComp = document.querySelector('.body')
  bodyComp.innerHTML = ''
  const comp1 = document.createElement('div')
  comp1.setAttribute('class', 'comp')
  comp1.setAttribute('id', 'comp1')
  let [comp1X, comp1Y] = getComp1Position(radius)
  comp1.style.left = `${comp1Y}px`
  comp1.style.top = `${comp1X}px`
  bodyComp.append(comp1)
  makeComponent(20, true, comp1X, comp1Y, radius)
  makeComponent(20, false, 0, 0, radius)
})
