var PLAY=1;
var END=0;
var gameState=1;
var player1,  ground,backgr,  backImage,player;
var pinkBall,redBall;
var pink_ball,red_ball;
var yellowBall,multicolourBall;
var yellow_ball,multicolour_ball,blue_ball;
var obstacle,ball1;
var obstacle1img,obstacle2img;
var bg;
var obstaclesGroup,ballsGroup;
var restart,gameOver,restart1,gameOver1;
var score=0;
var ground;
var point1,backgroung1,gameoverSound,jumping;
function preload(){
   player1 = loadImage("player.png");
  pink_ball = loadImage("pink1.png");
  red_ball = loadImage("red.png");
  backImage= loadImage("background.png");
  yellow_ball = loadImage("yellow1.png");
   multicolour_ball = loadImage("colour.png");
  blue_ball = loadImage("blue.png");
  obstacle1img = loadImage("blueFlame.png");
  obstacle2img = loadImage("yellowFlame.png");
  restart1= loadImage("reset.png");
  gameOver1 = loadImage("gameOver.png");
  point1 = loadSound("point.mp3");
  background1 = loadSound("background.mp3");
  gameSound = loadSound("gameover1.mp3");
  jumping= loadSound("jumping.mp3");
}



function setup() {
  createCanvas( 800,400);
 
 backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
 
  ground = createSprite(400,350,800,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;
 
   
  player = createSprite(350,340,800,50);
  player.addImage(player1);
  player.scale = 0.3;
  restart = createSprite(300,200);
  restart.addImage(restart1);
    restart.scale = 0.5;
   gameOver = createSprite(300,150);
  gameOver.addImage(gameOver1);
  obstaclesGroup = new Group();
ballsGroup = new Group();
}

function draw() {
   background(255);
    if(gameState===PLAY){
        gameOver.visible = false;
    restart.visible = false;
      background1.play();
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
   if(ground.x<0) {
    ground.x=ground.width/2;
  }
    if(keyDown("space") ) {
      player.velocityY = -12;
      background1.stop();
      jumping.play();
    }
    player.velocityY = player.velocityY + 0.8;
 
    player.collide(ground);
  balls()
  obstacles();
      if(ballsGroup.isTouching(player)){
      ballsGroup.destroyEach();
      score=score+5;
             background1.stop();
        point1.play();
    }
       if(obstaclesGroup.isTouching(player)){
      gameState = END;
      obstaclesGroup.destroyEach();
       ballsGroup.destroyEach();
    }
    }
     if(gameState===END){
  gameOver.visible = true;
    restart.visible = true;
       gameSound.play();
       background1.stop();
         backgr.velocityX=0;
      ballsGroup.destroyEach();
        obstaclesGroup.destroyEach();
        ballsGroup.setVelocityXEach(0);
        obstaclesGroup.setVelocityXEach(0);
        if(mousePressedOver(restart)){
     reset();
   }
    }
 
  drawSprites();
   
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);
}
function balls(){
  if(frameCount%60===0){
    var ball1=createSprite(200,160,20,20);
    ball1.velocityX = 5;
    var rand = Math.round(random(1,5))
    switch(rand){
      case 1:
        ball1.addImage(pink_ball)
        break;
        case 2:
        ball1.addImage(red_ball)
        break;
        case 3:
        ball1.addImage(yellow_ball)
        break;
        case 4:
        ball1.addImage(multicolour_ball)
        break;
        case 5:
        ball1.addImage(blue_ball)
        break;
        default:
        break;
    }
    ball1.scale = 0.2;
    ballsGroup.add(ball1)
  }
}
function obstacles(){
  if(frameCount%125===0){
    obstacle = createSprite(200,200,20,20);
    obstacle.velocityX = 5;
    var rand = Math.round(random(1,2))
    switch(rand){
      case 1:
        obstacle.addImage(obstacle1img)
        break;
        case 2:
        obstacle.addImage(obstacle2img)
        break;
         default:
        break;
    }
    obstacle.scale = 0.2;
    obstaclesGroup.add(obstacle)
  }
}
function reset(){
    gameState = PLAY;
  score = 0;
    player.addImage(player1);
   backgr.velocityX = -5;
  if( backgr.x<100){
     backgr.x = width/2
  }
}