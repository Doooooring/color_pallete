let radius = 250;
let numberOfBox = 10;
const body = document.querySelector(".body");
const controllRadius = document.querySelector("#radius");

//원 중심 찾기
let centerX = body.style.height.slice(0, -2) / 2 + 100;
let centerY = body.style.width.slice(0, -2) / 2;

//색 목록
let colors = [
  "red",
  "orange",
  "yellow",
  "rgb(32, 210, 82)",
  "green",
  "blue",
  "indigo",
  "violet",
  "brown",
];

/**
 *
 * @param {integer} N
 * @param {bool} inner
 * 안에다 그릴 원, 밖에다 그릴 원 결정
 * @param {*} startX
 * 바탕화면을 기준으로 그리게 될지, 안에다가 그리게 될지에 따라 박스를 놓아야 하는 위치가 달라짐. 상대위치를 구하기 위한 초기위치값의 X
 * 바깥 원이라면 시작 X가 0 일거고 안에 원이라면 시작 X가 첫번째 박스의 X 좌표 일거임
 * @param {*} startY
 * @param {*} R
 * 원 반지름
 */
function makeComponent(N, inner, startX, startY, R) {
  let parentComp;
  let zStart;
  let compNum;
  const firstComp = document.querySelector("#comp1");
  firstComp.style.zIndex = N;

  //안에 놓는 원은 N 개를 놓는게 아니라 절반만 놓을거임
  if (inner) {
    parentComp = document.querySelector("#comp1");
    compNum = Math.floor(N / 2 + 1);
    zStart = N;
  } else {
    parentComp = document.querySelector(".body");
    compNum = N;
    zStart = 0;
  }

  //현재 기준 좌표에 대한 원의 중심의 상대적인 위치
  const curCenX = centerX - startX;
  const curCenY = centerY - startY;

  for (let n = 1; n < compNum; n++) {
    const compBox = document.createElement("div");
    const PI = Math.PI;
    const THETA = (2 * PI * n) / N;
    const boxColor = colors[n % colors.length];
    compBox.setAttribute("class", "comp");
    const curX = curCenX - R * Math.cos(THETA) - 120;
    const curY = curCenY + R * Math.sin(THETA) - 80;
    compBox.style.postion = "absolute";
    compBox.style.left = `${curY}px`;
    compBox.style.top = `${curX}px`;
    compBox.style.transform = `rotate(${THETA}rad)`;
    compBox.style.backgroundColor = boxColor;
    compBox.style.zIndex = zStart + n;
    parentComp.append(compBox);
  }
}

//전체 화면 기준 첫 박스 위치 찾기(직사각형 왼쪽 상단 꼭지점 위치)
function getComp1Position(R) {
  let comp1X = centerX - R - 120;
  let comp1Y = centerY - 80;
  return [comp1X, comp1Y];
}

let [comp1X, comp1Y] = getComp1Position(radius);
const comp1 = document.querySelector("#comp1");
comp1.style.left = `${comp1Y}px`;
comp1.style.top = `${comp1X}px`;

makeComponent(numberOfBox, false, 0, 0, radius);
makeComponent(numberOfBox, true, comp1X, comp1Y, radius);

// 좌 상단에 스크롤 바에 따라서 반지름 늘리고 줄여서 애니메이션 줌
controllRadius.addEventListener("input", (e) => {
  radius = e.target.value;
  const bodyComp = document.querySelector(".body");
  bodyComp.innerHTML = "";
  const comp1 = document.createElement("div");
  comp1.setAttribute("class", "comp");
  comp1.setAttribute("id", "comp1");
  let [comp1X, comp1Y] = getComp1Position(radius);
  comp1.style.left = `${comp1Y}px`;
  comp1.style.top = `${comp1X}px`;
  bodyComp.append(comp1);
  makeComponent(numberOfBox, true, comp1X, comp1Y, radius);
  makeComponent(numberOfBox, false, 0, 0, radius);
});
