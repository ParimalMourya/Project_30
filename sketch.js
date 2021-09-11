const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var ground, rightWall, leftWall;
var bridge, jointLink;
var stones = [];

var bgImg, zombie, zombieImg, breakButton, stone, wood;

function preload(){
  bgImg = loadImage("assets/background.png");
  zombieImg = loadImage("assets/zombie.png");
  stone = loadImage("assets/stone.png");
  wood = loadImage("assets/wood.png");
};

function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);

  //bridge = new Bridge(20, {x:200, y:height-430});
  //jointPoint = new Base(width-200, height-430, 20, 20);

  bridge = new Bridge(30, { x: 50, y: height / 2 -200});
  jointPoint = new Base(width - 600, height / 2 + 10, 40, 20);

  zombie = createSprite(width/2, height-110);
  zombie.addImage(zombieImg);
  zombie.scale = 0.1;
  zombie.velocityX = 1;

  breakButton = createImg("assets/axe.png");
  breakButton.position(width-200, height-430);
  breakButton.size(80,80);
  breakButton.mousePressed(handleButtonPress);

  Matter.Composite.add(bridge.body, jointPoint);
  jointLink = new Link(bridge, jointPoint);

  ground = new Base(width/2, height-10, width, 20);
  leftWall = new Base(100, height-230, 200, 400);
  rightWall = new Base(width-100, height-230, 200, 400);

  for (var i=0; i < 8; i++){
    var x = random(width/2 - 200, width/2 + 200);
    var y = random(-10, 100);
    var stone = new Stone(x, y, 80,80,stone);
    stones.push(stone);
  }

}

function draw() {
  background(bgImg);
  Engine.update(engine);

  bridge.show();
  drawSprites();

  for (var i=0; i < 8; i++){
    stones[i].display();
  }
}

function handleButtonPress(){
  jointLink.dettach();
  setTimeout(() => {
    bridge.break();
  }, 1500);
}
