var SVG; //MAIN SVG ELEMENT
var w; //WIDTH OF THE SCREEN
var h; //HEIGHT OF THE SCREEN
var ground; //GROUND ELEMENT
var score; //SCORE ELEMENT
var maxPlatforms = 20; //MAX PLATFORMS TO PREPARE
var platformsArray = []; //STORES ALL PLATFORMS IN A ARRAY
var activePlatforms = 0; //PLATFORMS CURRENTLY ON THE SCREEN
var maxActivePlatforms = 10; //MAX PLATFORMS ON THE SCREEN -> DIFFICULTY


function initLevel()
{
    SVG = document.getElementById("SVG_scene"); //GET SVG ELEMENT
    w = window.innerWidth; //GET WINDOW WIDTH
    h = window.innerHeight; //GET WINDOW HEIGHT

    createLevel(); //CREATE LEVEL
    score();
}

function createLevel()
{
    var svgNS = "http://www.w3.org/2000/svg";   //DEFINE THE namespaceURI
    var level = document.createElementNS(svgNS,"g"); //CREATE A GROUP FOR THE ENTIRE LEVEL

    ground = document.createElementNS(svgNS, "rect"); //CREATE A RECT WHICH REPRESENT THE GROUND
    ground.setAttributeNS(null,"x",0);  //START X
    ground.setAttributeNS(null,"y",h-50);  //START Y
    ground.setAttributeNS(null,"width", w);  //WIDTH
    ground.setAttributeNS(null,"height",50);   //HEIGHT
    ground.setAttributeNS(null,"fill", '#964B00' );   //FILLCOLOR
    ground.position = { x: 0, y: 0 }; //TRANSFORM VALUE OF THE GROUND


    var midLine = document.createElementNS(svgNS,"line"); //CREATE A RECT WHICH REPRESENT THE GROUND
    midLine.setAttributeNS(null,"x1",0);  //START X
    midLine.setAttributeNS(null,"y1",h/2-100);  //START Y
    midLine.setAttributeNS(null,"x2",w);  //WIDTH
    midLine.setAttributeNS(null,"y2",h/2-100);   //HEIGHT
    midLine.setAttributeNS(null,"stroke","white");   //FILLCOLOR
    midLine.setAttributeNS(null,"stroke-width","5");   //FILLCOLOR
    midLine.setAttributeNS(null,"stroke-dasharray","10 10");   //FILLCOLOR


    //CREATE "maxPlatforms" PLATFORMS
    for (var i = 1; i < maxPlatforms; i++)
    {
        var platform = document.createElementNS(svgNS, 'image');
        platform.setAttributeNS(null, 'preserveAspectRatio', 'none');
        platform.setAttributeNS(null,"x",-100); //START X -> STARTS OFFSCREEN
        platform.setAttributeNS(null,"y",0);    //START Y
        platform.setAttributeNS(null, 'width', '100px');
        platform.setAttributeNS(null, 'height', '50px');
        platform.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '/images/block.png');


        platform.position = { x: 0, y: 0 }; //TRANSFORM VALUE OF THE PLATFORM
        platform.velocity = { x: 3, y: 0 }; //VELOCITY OF THE PLATFORM

        level.appendChild(platform); //PUT THE PLATFORM INSIDE THE "level" GROUP

        platformsArray.push(platform); //PUT THE PLATFORM INSIDE THE "platformsArray"
    }
    level.appendChild(ground);//PUT THE GROUND INSIDE THE "LEVEL" GROUP
    level.appendChild(midLine);//PUT THE GROUND INSIDE THE "LEVEL" GROUP
    SVG.appendChild(level); //APPEND LEVEL TO THE SVG ELEMENT
}

function setPlatform()
{
    //SET A NEW RANDOM PLATFORM POSITION

    var side = Math.random();   //RANDOM CHOOSE LEFT OR RIGHT SIDE

    platformsArray[activePlatforms].position.y = (h+200)/maxActivePlatforms*activePlatforms+Math.random()*10; //SET Y POSITION

    if(side < 0.5)
    {
        platformsArray[activePlatforms].position.x = (Math.random()*400)*-1; //SET RANDOM START POSITION X LEFT
        platformsArray[activePlatforms].velocity.x = Math.random()*4+1; //SET RANDOM START VELOCITY
    }
    else
    {
        platformsArray[activePlatforms].position.x = w+200+(Math.random()*400);//SET RANDOM START POSITION X RIGHT
        platformsArray[activePlatforms].velocity.x = Math.random()*4+1;//SET RANDOM START VELOCITY
    }


    activePlatforms +=1;
}

function score()
{
    var svgNS = "http://www.w3.org/2000/svg";   //DEFINE THE namespaceURI

    score = document.createElementNS(svgNS,"text"); //CREATE A RTEXT NODE
    score.setAttributeNS(null,"x",w-60); //START X
    score.setAttributeNS(null,"y",h/2-110);    //START Y
    score.setAttributeNS(null,"fill","white"); //FILLCOLOR
    score.setAttributeNS(null,"font-family","helvetica"); //FONT
    score.setAttributeNS(null,"font-weight","bold"); //FONT-WEIGHT
    score.textContent ="0";  //TEXT
    score.current = 0; //CURRENT SCORE


    SVG.appendChild(score) ;//APPEND LEVEL TO THE SVG ELEMENT
}

function updateScore()
{

    score.current += 1/10; //ADD TO SCORE
    score.textContent =Math.round(score.current);  //UPDATE SCORE
}

function updateLevel(dt)
{
    //UPDATE LEVEL ON EACH FRAME AND GET FRAMETIME "dt"
    if(activePlatforms < maxActivePlatforms) // SET PLATFORMS
    {
        setPlatform();
    }

    if(player.position.y < h/2 && player.velocity.y <= 0) //MOVE LEVEL DOWN WHILE PLAYER MOVES UP
    {
        var pv = player.velocity.y; //GET PLAYER VELOCITY
        for (var i = 0; i < activePlatforms; i++)
        {
            platformsArray[i].velocity.y = pv*-1; //PASS PLAYER VELOCITY TO WORLD
        }
        player.position.y -=pv* dt * 60/1000; //RESET PLAYER VELOCITY

        updateScore();

        if(ground.position.y < 110)//IF GROUND IS STILL IN SCENE -> MOVE IT DOWN
        {
            ground.position.y -= pv;//GET THE NEW Y POSITION
            ground.setAttribute("transform", "translate(" +0 + " "+ ground.position.y +" )");//TRANSFORM TO THE NEXT Y POSITION
        }
    }
    else//MOVE LEVEL DOWN WHILE PLAYER MOVES UP
    {
        for (var i = 0; i < activePlatforms; i++)
        {
            platformsArray[i].velocity.y = 0;}
    }

    for (var i = 0; i < activePlatforms; i++)
    {


        if(platformsArray[i].velocity.x > 0 && platformsArray[i].position.x > w) //CHECK FOR RIGHT BOUNDRIES
        {
            platformsArray[i].velocity.x = platformsArray[i].velocity.x *-1; //INVERT PLATFORM VELOCITY
        }

        if(platformsArray[i].velocity.x < 0 && platformsArray[i].position.x < 100) //CHECK FOR LEFT BOUNDRIES
        {
            platformsArray[i].velocity.x = platformsArray[i].velocity.x *-1; //INVERT PLATFORM VELOCITY
        }

        if(platformsArray[i].position.y > h)//BLOCK IS OUT OF SCREEN
        {
            platformsArray[i].position.y = (Math.random()*100)*-1; //PUT IT BACK ON TOP
            platformsArray[i].velocity.x = Math.random()*4+1; //SET NEW VELOCITY
        }


        platformsArray[i].position.x += platformsArray[i].velocity.x * dt * 60/1000;//GET THE NEW X POSITION
        platformsArray[i].position.y += platformsArray[i].velocity.y * dt * 60/1000;//GET THE NEW X POSITION
        platformsArray[i].setAttribute("transform", "translate(" + platformsArray[i].position.x + " "+ platformsArray[i].position.y +" )");//TRANSFORM TO THE NEXT X POSITION
    }

}
