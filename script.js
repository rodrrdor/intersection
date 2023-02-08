const FPS = 60;
var cnv, ctx;
var mouse = {x: 0, y:0};
var point1, point2, point3, point4, point5, points = [];

window.onload = function() {
    cnv = document.getElementById("canvas");
    ctx = cnv.getContext("2d");
    point1 = {
        x: window.innerWidth / 3,
        y: window.innerHeight / 2,
        r: 10,
        color: "red",
        touched: false,
        pressed: false
    }; point2 = {
        x: window.innerWidth - point1.x,
        y: point1.y,
        r: point1.r,
        color: "lime",
        touched: false,
        pressed: false
    }; point3 = {
        x: window.innerWidth / 2,
        y: point1.y + (point1.x - point2.x) / 2,
        r: point1.r,
        color: "cyan",
        touched: false,
        pressed: false
    }; point4 = {
        x: window.innerWidth / 2,
        y: point1.y - (point1.x - point2.x) / 2,
        r: point1.r,
        color: "magenta",
        touched: false,
        pressed: false
    };
    points = [point1, point2, point3, point4];
    setInterval(main, 1000 / FPS);
};
function main() {
    cnv.width = window.innerWidth;
    cnv.height = window.innerHeight;
    events();
    draw();
};
function events() {
    for (let point = 0; point < points.length; point++) {
        let catx = mouse.x - points[point].x;
        let caty = mouse.y - points[point].y;
        let hipo = Math.sqrt(catx * catx + caty * caty);
        if (hipo < points[point].r) {points[point].touched = true;} else {points[point].touched = false;};
    };
    window.addEventListener("mousedown", (e) => {
        for (let point = 0; point < points.length; point++) {
            if (points[point].touched) {
                points[point].x = e.clientX;
                points[point].y = e.clientY;
                points[point].pressed = true;
    };};});
    window.addEventListener("mousemove", (e) => {
        mouse = {
            x: e.clientX,
            y: e.clientY,
            r: 1
        };
        for (let point = 0; point < points.length; point++) {
            if (points[point].pressed) {
                points[point].x = e.clientX;
                points[point].y = e.clientY;
    };};});
    window.addEventListener("mouseup", () => {
        for (let point = 0; point < points.length; point++) {
            points[point].pressed = false;
};});};
function draw() {
    let intersection1 = ((point4.x - point3.x) * (point1.y - point3.y) - (point4.y - point3.y) * (point1.x - point3.x)) / ((point4.y - point3.y) * (point2.x - point1.x) - (point4.x - point3.x) * (point2.y - point1.y));
    let intersection2 = ((point3.y - point1.y) * (point1.x - point2.x) - (point3.x - point1.x) * (point1.y - point2.y)) / ((point4.y - point3.y) * (point2.x - point1.x) - (point4.x - point3.x) * (point2.y - point1.y));
    point5 = {
        x: point1.x + (point2.x - point1.x) * intersection1,
        y: point1.y + (point2.y - point1.y) * intersection1,
        r: point1.r,
        color: "white"
    };
    ctx.strokeStyle="yellow";
    ctx.beginPath();
    ctx.moveTo(point1.x, point1.y);
    ctx.lineTo(point2.x, point2.y);
    ctx.stroke();
    ctx.strokeStyle="blue";
    ctx.beginPath();
    ctx.moveTo(point3.x, point3.y);
    ctx.lineTo(point4.x, point4.y);
    ctx.stroke();
    for (let point = 0; point < points.length; point++) {
        ctx.strokeStyle=points[point].color;
        ctx.fillStyle=points[point].color;
        ctx.beginPath();
        ctx.arc(points[point].x, points[point].y, points[point].r, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    };
    if (intersection1 > 0 && intersection1 < 1 && intersection2 > 0 && intersection2 < 1){
    ctx.strokeStyle=point5.color;
    ctx.fillStyle=point5.color;
    ctx.beginPath();
    ctx.arc(point5.x, point5.y, point5.r, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
};};
