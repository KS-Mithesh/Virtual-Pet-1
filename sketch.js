var puppy, puppyImage, puppyStanding, puppySitting;
var food = 0, foodStock, stock;
var database;

function preload()
{
  puppyStanding = loadImage("images/dogimg.png");
  puppySitting  = loadImage("images/dogimg1.png");
}

function setup() {
  createCanvas(800, 700);
  database = firebase.database();
  
  puppy = createSprite(400,410,10,10);
  puppy.scale=0.3;

  foodStock=database.ref('food');
  foodStock.on("value",readStock);
}

function draw() {  
  background(46,139,87);
  textSize(15);fill("white");
  text("Note: Press UP_ARROW KEY To Feed Milk",250,20);

  textSize(30);fill("white");
  text("Food Remaining: "+food,280,250);

  if(keyWentDown(UP_ARROW)) {
    database.ref("food").set(food-1);
    puppy.addImage("sitting puppy", puppySitting);
  }
  else {
    puppy.addImage("standing puppy", puppyStanding);
  }

  drawSprites();
  //add styles here

}

function readStock(data) {
  stock = data.val();
  food = stock;
}