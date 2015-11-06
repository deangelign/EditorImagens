//variaveis globais
var mouseCursorPositionInArea_X;
var mouseCursorPositionInArea_Y;

var mouseCursorPositionInArea_X_mouseDown;
var mouseCursorPositionInArea_Y_mouseDown;

var mouseCursorPositionInArea_X_mouseDown_While;
var mouseCursorPositionInArea_Y_mouseDown_While;

var mouseCursorPositionInArea_X_mouseup;
var mouseCursorPositionInArea_Y_mouseup;

var coordMouseDownMouseUp;//apenas uma string para propositos de debug

var mousePressed = false;

var timeoutId = 0;
//var originalImageData = contextFourierTransformArea.getImageData(0,0,canvasAreaWidth, canvasAreaHeight);


//acha a posicao do curso do mouse em relacao a um objeto na pagina
function findPos(obj) {
    var curleft = 0, curtop = 0;
    if (obj.offsetParent) {
        do {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
        return { x: curleft, y: curtop };
    }
    return undefined;
}

//coverte a intesidade do pixel de R-G-B para Hexadecimal
function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}


// set up some squares
//var example = document.getElementById('imageFourierTransformArea');
//var context = example.getContext('2d');
//context.fillStyle = "rgb(255,0,0)";
//context.fillRect(0, 0, 50, 50);
//context.fillStyle = "rgb(0,0,255)";
//context.fillRect(55, 0, 50, 50);



function drawShape(){
    var rectWidth = mouseCursorPositionInArea_X_mouseDown_While - mouseCursorPositionInArea_X_mouseDown;
    var rectHeight = mouseCursorPositionInArea_Y_mouseDown_While - mouseCursorPositionInArea_Y_mouseDown;
    contextFourierTransformArea.fillRect(mouseCursorPositionInArea_X_mouseDown,mouseCursorPositionInArea_Y_mouseDown,rectWidth,rectHeight);
}

function whileMouseDown(x, y){
    //contextFourierTransformArea.drawImage(originalImageData, 0,0);
    mouseCursorPositionInArea_X_mouseDown_While = x;
    mouseCursorPositionInArea_Y_mouseDown_While = y;
    var rectWidth = mouseCursorPositionInArea_X_mouseDown_While - mouseCursorPositionInArea_X_mouseDown;
    var rectHeight = mouseCursorPositionInArea_Y_mouseDown_While - mouseCursorPositionInArea_Y_mouseDown;
    //contextFourierTransformArea.strokeRect(mouseCursorPositionInArea_X_mouseDown,mouseCursorPositionInArea_Y_mouseDown,rectWidth,rectHeight);
    coordMouseDownMouseUp = "x=" + mouseCursorPositionInArea_X_mouseDown + ", y=" + mouseCursorPositionInArea_Y_mouseDown +
        "<br>" + "x=" + mouseCursorPositionInArea_X_mouseDown_While + ", y=" + mouseCursorPositionInArea_Y_mouseDown_While;
    $('#status2').html(coordMouseDownMouseUp);
}

$("#imageFourier").on('click', function (e) {
    if (longpress) {
        drawShape();
    }
});

$("#imageFourier").on('mousedown', function (e) {
        var pos = findPos(this);
    mouseCursorPositionInArea_X_mouseDown = e.pageX - pos.x;
    mouseCursorPositionInArea_Y_mouseDown = e.pageY - pos.y;
    coordMouseDownMouseUp = "x=" + mouseCursorPositionInArea_X_mouseDown + ", y=" + mouseCursorPositionInArea_Y_mouseDown;
    $('#status2').html(coordMouseDownMouseUp);
    startTime = new Date().getTime();
    mousePressed =  true;
});

$("#imageFourier").on('mouseup', function (e) {
    endTime = new Date().getTime();
    longpress = (endTime - startTime >= 200);//clica e espera pelo ao menos 0.2 segundo para ser considera um "click and hold"
    //coordMouseDownMouseUp += "<br>" + "x=" + mouseCursorPositionInArea_X_mouseup + ", y=" + mouseCursorPositionInArea_Y_mouseup;
    $('#status2').html(coordMouseDownMouseUp);
    mousePressed = false;

});

$('#imageFourier').mousemove(function(e) {
    var pos = findPos(this);
    mouseCursorPositionInArea_X = e.pageX - pos.x;
    mouseCursorPositionInArea_Y = e.pageY - pos.y;
    var coord = "x=" +  mouseCursorPositionInArea_X + ", y=" + mouseCursorPositionInArea_Y;
    var c = this.getContext('2d');
    var p = c.getImageData(mouseCursorPositionInArea_X, mouseCursorPositionInArea_Y, 1, 1).data;
    var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
    $('#status').html(coord + "<br>" + hex);
    if(mousePressed){
        whileMouseDown(mouseCursorPositionInArea_X, mouseCursorPositionInArea_Y);
    }
});




