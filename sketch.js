var bananaImage;
var obstacleImage;
var obstacleGroup;
var backImage;
var score;
var player,player_running;
var scene;
var foodGroup;
var obstaclesGroup;
var ground, invisibleGround;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
   backImage = loadImage("jungle2.jpg");

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
     
}



function setup() {
  createCanvas(400, 400);
  
  scene = createSprite(400,400,40,40);
  scene.addImage(backImage);
  scene.velocityX = -4;
  scene.x = scene.width /2;
  
  player = createSprite(70,290,20,50);
  player.addAnimation("monkey",player_running);
  player.scale = 0.1;
   
  foodGroup = new Group();
  obstaclesGroup = new Group();
  
  ground = createSprite(200,380,400,40);
  ground.shapeColor = color("brown");

  invisibleGround = createSprite(200,380,400,10);
  invisibleGround.visible = false;

  score=0;
}

function draw() {
  background(220);
  
  
  
  if(keyDown("space") ){
    player.velocityY = -12 ;
  }
  player.velocityY = player.velocityY + 0.8; 
    
  if(scene.x <0){
    scene.x = scene.width /2;
  }
  player.collide(invisibleGround);
  
    //for(var i =0; i<foodGroup.size();i++)
  
  if (foodGroup.isTouching(player)){
  foodGroup.destroyEach();
 score = score+2; 
 }
  
  switch(score){
    case 10: player.scale = 0.2;
          break;
   case 20: player.scale = 0.3;
         break;
   case 30 : player.scale = 0.4
          break;
   case 40: player.scale = 0.5
          break;
  default : 
          break;
  }
  
  if(obstaclesGroup.isTouching(player)){
    player.scale = 0.08;
  }
  
  spawnObstacles();
  spawnBanana();
  drawSprites();
  
  stroke("black");
  textSize(20);
  fill("white");
  text("Score "+ score,300,50);
}

function spawnBanana() { 

  if (frameCount % 100 === 0) {
    var banana = createSprite(400,220,40,10);
    banana.y = Math.round(random(120,160));
    banana.addImage(bananaImage);
    banana.scale = 0.08;
    banana.velocityX = -3;
    
    
    banana.lifetime = 200;
   
   foodGroup.add(banana);
  } 
}

 function spawnObstacles() {
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(400,320,800,40);
     obstacle.y = Math.round(random(330,340));
    obstacle.velocityX = -6;

    obstacle.addAnimation("Stone",obstacleImage);
    
    obstacle.scale = 0.15;
    obstacle.lifetime = 70;

    obstaclesGroup.add(obstacle);
  }
}