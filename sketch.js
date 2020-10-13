var PLAY = 1;
var END = 0;
var gameState = PLAY;

var gameOver,restart,gameOverImage,restartImage;
var count=0 
var groundImage,ground,invisibleGround;
var trex,trex_running;
var cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6
 var ObstaclesGroup,CloudsGroup
function preload(){
trex_running=loadAnimation ("trex1.png","trex3.png","trex4.png"); 
  trex_collided=loadAnimation("trex_collided.png");
  cloudImage = loadImage("cloud.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png"); 
  obstacle4 = loadImage("obstacle4.png"); 
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");

  
  groundImage=loadImage("ground2.png");
  gameOverImage=loadImage("gameOver.png");
  restartImage=loadImage("restart.png");
  

  jumpSound=loadSound('jump.mp3');
  dieSound=loadSound("die.mp3");
  checkSound=loadSound("checkPoint.mp3");
}

function setup() {
  createCanvas(600, 200);
   trex = createSprite(50,180,20,50);
  
trex.addAnimation("running",trex_running);
  trex.addAnimation("collided",trex_collided);  



//scale and position the trex
trex.scale =0.5;
  trex.setCollider("circle",0,0,30);

  
  
  //create a ground sprite
ground = createSprite(300,180,600,20);
ground.addImage(groundImage);
ground.x = ground.width /2;

 invisibleGround=createSprite(300,185,600,5);
invisibleGround.visible=false

   ObstaclesGroup =new Group();
 CloudsGroup = new Group();
  
 gameOver = createSprite(300,100);
restart = createSprite(300,140);
gameOver.addImage(gameOverImage); 
gameOver.scale = 0.5;
restart.addImage(restartImage);
restart.scale = 0.5;

gameOver.visible = false;
restart.visible = false;
}

function draw() {
   //set background to white
  background("white");
  //display score
  text("Score: "+ count, 500, 50);
  //console.log(gameState);
  
  if(gameState === PLAY){
    //move the ground
    ground.velocityX = -(6 + 3*count/100);
    //scoring
    count =count+ Math.round(World.frameRate/60);
    
    if (count>0 && count%100 === 0){
      checkSound.play();
    }
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
     //jump when the space key is pressed
    if(keyDown("space") && trex.y >= 150){
      trex.velocityY = -12 ;
      jumpSound.play();
    }
  
    //add gravity
    trex.velocityY = trex.velocityY + 0.8;
    
    //spawn the clouds
    spawnClouds();
  
    //spawn obstacles
    spawnObstacles();
    
    //End the game when trex is touching the obstacle
    if(ObstaclesGroup.isTouching(trex)){
      dieSound.play();
      gameState = END;
      
    }
  }
  
  else if(gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation('collided',trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    ObstaclesGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);
     if(mousePressedOver(restart)) {
    reset();
  } 
    
  }
  

  
  //console.log(trex.y);
  
  //stop trex from falling down
  trex.collide(invisibleGround);
  
  drawSprites();
}

 function reset(){
  gameState=PLAY;
  ObstaclesGroup.destroyEach();
  CloudsGroup.destroyEach();
  count=0;
  trex.changeAnimation("running",trex_running);
  restart.visible=false;
  
  gameOver.visible=false;
  
}  
  
  
  
  
  
  
  
  
  
  
  
  
  

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage (cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 220;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1
    CloudsGroup.add(cloud);
  }
  
}
function spawnObstacles() {
  //write code here to spawn the clouds
  if (frameCount % 100 === 0) {
    var obstacle = createSprite(600,160,10,40);
    var rand = Math.round(random(1,6));
    switch(rand){ 
      case 1:obstacle.addImage(obstacle1);
        break;
          case 2:obstacle.addImage(obstacle2);
        break;
          case 3:obstacle.addImage(obstacle3);
        break;
          case 4:obstacle.addImage(obstacle4);
        break;
          case 5:obstacle.addImage(obstacle5);
        break;
          case 6:obstacle.addImage(obstacle6);
        break;
    }
   // obstacle.addImage(obstacle+rand)
    obstacle.scale = 0.5;
    obstacle.velocityX = -6;
    
     //assign lifetime to the variable
    obstacle.lifetime = 220;
    ObstaclesGroup.add (obstacle)
    
    
    
      }
}