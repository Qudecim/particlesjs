var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

//Цвет фона 
let bgcolor = '#181818';
//Цвет линий
let linecolor = '#eb3b5a';
//Количество литающих точек
let countdot = 250;
//Максимальная длина соединяющих линий
let lengthline = 120;
//Коэфициент скорости полета точек. Чем он больше тем быстрее все движется
let kspeed = 0.04;
//Массив с координатами точек
var points = Array();

function printMousePos(event) {
    let moveX = (getRandomInt(100)-50)*kspeed;
    let moveY = (getRandomInt(100)-50)*kspeed;
    points.push({x:event.clientX,y:event.clientY,mx:moveX,my:moveY});
}

document.addEventListener("click", printMousePos);

function start() {
    //Создаем цикл который будет происходитть до тех пор пока i не достигнет значения countdot. В нашем случае это 250 точек
    for (var i = 0; i<countdot; i++) {
        //Получем движение по горизонтали
        //getRandomInt даст нам число 0 до 100, от этого числа отнимем 50 и поучем случайное число от -50 до +50
        //Умнажаем число на наш коэйициент скорости
        let moveX = (getRandomInt(100)-50)*kspeed;
        let moveY = (getRandomInt(100)-50)*kspeed;
        //Добавляем точку в массив с остальными точками
        //x:getRandomInt(canvas.width) - установит случайную координату от 0 до ширины канваса, в нашем случаее это 1000
        points.push({x:getRandomInt(canvas.width),y:getRandomInt(canvas.height),mx:moveX,my:moveY});
    }
}
//Сразу вызовем нашу функцию
start();

function draw() {
    //Выставим цвет для заливок bgcolor
    ctx.fillStyle = bgcolor;
    //Нарисуем квадрат от 0 до ширины и высоты канваса
    //Таким образом каждый раз мы будем очищать наш холст
    //Можете закомментировать строку, и получить довольно интересные эффекты
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    //цикл который перебирает все точки
    for (var i = 0; points.length>i; i++) {

        //Задаем цает наших линий
        ctx.strokeStyle = linecolor;
        //Второй цикл, для того что бы мы могли сравнить нашу точку с другими точками
        for (var i2 = i + 1; points.length>i2; i2++) {
            //Дистанция между точками рассчитывается по теореме пифагора. Сумма квдратов катетов равна квадрату длины гипатенузы
            //Подробнее я опишу нижу
            var distance = Math.sqrt(Math.pow(points[i].x - points[i2].x,2) + Math.pow(points[i].y - points[i2].y,2));
            //Проверяем меньше ли дистанция между точками чем заданная нами максимальная длина линий
            if (distance < lengthline) {
                //Если дистанция меньше, то мы будем прорисовывать лининю
                //Так же чем дальше точки друг от друга тем менее видимой становится линия
                ctx.globalAlpha = 1 - distance/lengthline;
                //Рисуем линию которая начинается от точки 1 до точки 2
                ctx.beginPath();    
                ctx.moveTo(points[i].x, points[i].y);  
                ctx.lineTo(points[i2].x, points[i2].y); 
                ctx.stroke(); 
                //Возвращаем прозрачность в 1
                ctx.globalAlpha = 1;
            }

        }
        
        //Здесь мы сделаем провекру, на то что если к кординатам точки мы добавм его скорость
        //Будет ли точка за границами канваса.
        //Если да то скорость умножаем на -1. Это даст нам обратное движение
        //Нужно делать по отдельности для x и для y
        if (points[i].x + points[i].mx > canvas.width || points[i].x + points[i].mx < 0) {
            points[i].mx = points[i].mx * -1;
        } 
        points[i].x = points[i].x + points[i].mx;
        
        if (points[i].y + points[i].my > canvas.height || points[i].y + points[i].my < 0) {
            points[i].my = points[i].my * -1;
        } 
        
        //Теперь мы добавляем скорость точки к координатам
        points[i].y = points[i].y + points[i].my;
        
    }
    
}

setInterval(draw,25);

//Функция которая выдает случайное натуральное число от 0 до max
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}