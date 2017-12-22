var line = document.querySelector('.line');
var num1 = document.querySelector('.num1');
var num2 = document.querySelector('.num2');
var btnStart = document.querySelector('.start');
var otvet = document.querySelector('.otvet');

var a = Math.floor(Math.random() * (10 - 6) + 6);
var sum = Math.floor(Math.random() * (15 - 11) + 11);
var b = sum - a;

num1.innerHTML = a;
num2.innerHTML = b;

var step = 55.5; // шаг стрелки для перемещения на одно целое деление

var inputValueFirst = document.createElement('input');
inputValueFirst.className = 'inputValueFirst';
inputValueFirst.setAttribute('type', 'text');

var inputValueSecond = document.createElement('input');
inputValueFirst.className = 'inputValueSecond';
inputValueFirst.setAttribute('type', 'text');

var inputValueOtvet = document.createElement('input');
inputValueOtvet.className = 'inputValueOtvet';
inputValueOtvet.setAttribute('type', 'text');

btnStart.addEventListener('click', function () {
  this.remove();
  var canvas = document.getElementById('canvas');

  line.appendChild(inputValueFirst);

  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    ctx.transform(1, 0, 0, -1, 0, canvas.height);

    ctx.beginPath();
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
    ctx.moveTo(0, 0); // Начало фигуры
    ctx.bezierCurveTo(0, 0, (a * step) / 2, 300, a * step, 0); // Начало фигуры, контрольная точка и высота, конец фигуры
    ctx.stroke();
  }
});

function newLine() {
  var canvas = document.getElementById('canvas');

  line.appendChild(inputValueSecond);

  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
    ctx.moveTo(a * step, 0); // Начало фигуры
    ctx.bezierCurveTo(a * step, 0, ((a + sum) * step) / 2, 200, sum * step, 0); // Начало фигуры, контрольная точка и высота, конец фигуры
    ctx.stroke();
  }
}

function VvediteOtvet() {
  otvet.innerHTML = '';
  otvet.appendChild(inputValueOtvet);
  otvet.addEventListener('input', function () {
    if (inputValueOtvet.value == sum) {
      inputValueOtvet.remove();
      this.innerHTML = sum;
      inputValueOtvet.classList.remove('badOtvet');
    } else {
      inputValueOtvet.className = 'badOtvet';
    }
  })
}


inputValueFirst.addEventListener('input', function () {
  if (this.value == a) {
    this.remove();
    var trueOtvet = document.createElement('span');
    trueOtvet.className = 'trueOtvet';
    trueOtvet.innerHTML = a;
    line.appendChild(trueOtvet);
    num1.classList.remove('numOneBad');
    newLine();
  } else {
    this.className = 'badOtvet';
    num1.className = 'numOneBad';
  }
});

inputValueSecond.addEventListener('input', function () {
  if (this.value == b) {
    this.remove();
    var trueOtvet = document.createElement('span');
    trueOtvet.className = 'trueOtvet';
    trueOtvet.innerHTML = b;
    line.appendChild(trueOtvet);
    num2.classList.remove('numOneBad');
    VvediteOtvet();
  } else {
    this.className = 'badOtvet';
    num2.className = 'numOneBad';
  }
});