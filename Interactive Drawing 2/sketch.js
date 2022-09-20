var LowColor, HighColor;
var LineHeight;
var BoxExists;
var FRate;
var t;
var RectWidth, RectHeight;
var BoxSpeed;
var PointScores;

//SETUP FUNCTION
function setup() {
    createCanvas(500, 700);
    LowColor = color(29, 22, 59);
    HighColor = color(53, 23, 59);
    LineHeight = height - 150;
    FRate = 60;
    RectWidth = 180
    RectHeight = 55;
    PointScores = []
    resetBox();
    frameRate(FRate);
    createBG(HighColor, LowColor, LineHeight);
}//END SETUP

function createBG(c1, c2, lh){ //creates a gradient from HighColor to LowColor
    for(i = 0; i <= height; i++){
        let inter = i/height;
        let c = lerpColor(c1, c2, inter);
        stroke(c);
        line(0, i, width, i);
    }
    stroke(205, 167, 212);
    strokeWeight(5);
    line(0, lh, width, lh);
}

//DRAW FUNCTION
function draw() {
    
    if(frameCount%FRate === 20 && !BoxExists){
        BoxExists = true;
        t = 0;
    }
    dropBox();
    displayScore();
    checkResetBox();
    addTime();
}//END DRAW


function dropBox(){ //makes the box drop
    if(BoxExists){
        createBG(HighColor, LowColor, LineHeight);
        noStroke();
        fill(255, 190);
        rect(width/2-(RectWidth/2), t, RectWidth, RectHeight, 5,5,5,5);
        stroke(0);
        strokeWeight(5);
        line(width/2 - (RectWidth/2) + 30, t + RectHeight/2, width/2 + (RectWidth/2) - 30, t + RectHeight/2);
    }else{
        createBG(HighColor, LowColor, LineHeight);
    }
}

function displayScore(){
    let diaWide = 20;
    let row = 1;
    let col = 0;
    let i;
    for(i = 0; i < PointScores.length; i++){
        if(col>=width/diaWide){
            row++;
            col = 0;
        }
        noStroke();
        fill(diaColor(PointScores[i]));
        quad(col*diaWide+0.5*diaWide, row*diaWide-0.5*diaWide, col*diaWide+diaWide, row*diaWide, col*diaWide+0.5*diaWide, row*diaWide+0.5*diaWide, col*diaWide, row*diaWide);
        col++;
    }
}

function diaColor(timing){
    if(timing === "p"){
        return color(110, 230, 202);
    } else if (timing === "gr"){
        return color(173, 87, 168);
    } else if (timing === "g"){
        return color(108, 151, 186);
    } else{
        return color (120, 124, 128);
    }
}

function checkResetBox(){ //checks whether the box has gone off the screen
    if(t > height){
        resetBox();//if box has gone of screen, resets box
        append(PointScores, "m");
    }
}
function resetBox(){//resets the box
    t=0;
    BoxExists = false;
    BoxSpeed = floor(random(2, 14))
}

function addTime(){//
    if(BoxExists){
        t+= BoxSpeed;
    }
}

function keyPressed(){
    if(keyCode === 32){ //when SPACE pressed
        let dist = t;
        let timing = checkClickTiming(dist)
        print(timing);
        addPoint(timing);
        resetBox();
    }
}

function checkClickTiming(dist){
    if(BoxSpeed < 5){
        if(abs((t + RectHeight/2 - BoxSpeed)-LineHeight) < 8){
            return "perfect";
        } else if(abs((t + RectHeight/2 - BoxSpeed)-LineHeight) >= 8 && abs((t + RectHeight/2 - BoxSpeed)-LineHeight) < 16){
            return "great";
        } else if(abs((t + RectHeight/2 - BoxSpeed)-LineHeight) >= 16 && abs((t + RectHeight/2 - BoxSpeed)-LineHeight) < 25){
            return "good";
        } else{
            return "miss";
        }
    }
    if(BoxSpeed >= 5 && BoxSpeed < 10){
        if(abs((t + RectHeight/2)-LineHeight) < 17){
            return "perfect";
        } else if(abs((t + RectHeight/2)-LineHeight) >= 17 && abs((t + RectHeight/2)-LineHeight) < 30){
            return "great";
        } else if(abs((t + RectHeight/2)-LineHeight) >= 30 && abs((t + RectHeight/2)-LineHeight) < 45){
            return "good";
        } else{
            return "miss";
        }
    }
    if(BoxSpeed >= 10){
        if(abs((t + RectHeight/2)-LineHeight) < 26){
            return "perfect";
        } else if(abs((t + RectHeight/2)-LineHeight) >= 26 && abs((t + RectHeight/2)-LineHeight) < 38){
            return "great";
        } else if(abs((t + RectHeight/2)-LineHeight) >= 38 && abs((t + RectHeight/2)-LineHeight) < 55){
            return "good";
        } else{
            return "miss";
        }
    }
}


function addPoint(timing){
    if(timing === "perfect"){
        append(PointScores, "p");
    } else if(timing === "great"){
        append(PointScores, "gr");
    } else if(timing === "good"){
        append(PointScores, "g");
    } else{ //if miss (also if i happened to screw up anywhere earlier, it'll auto miss lmao)
        append(PointScores, "m");
    }
}





//refs:
//https://p5js.org/reference/#/p5/line
//https://p5js.org/reference/#/p5/lerpColor
//https://p5js.org/reference/#/p5/map
//https://p5js.org/examples/color-linear-gradient.html
//google color picker
//hatsune miku: colorful stage lol