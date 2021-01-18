// PROBLEM: TASK 12

var dog, dogSprite, happyDog; 
var foodS, foodStock;
var database;
var score = 0;
var bgIMG;
var feed, addFood;
var fedTime, lastFed;
var foodObj;

function preload()
{
  dog = loadImage("Dog.png");
  happyDog = loadImage("happydog.png");
  bgIMG = loadImage("bg.png");
}

function setup() 
{
	createCanvas(500, 500);
  
  dogSprite = createSprite(250, 300, 30, 30);
  dogSprite.addImage(dog);
  dogSprite.scale = 0.35;
  
  database=firebase.database();
  foodStock=database.ref('Food');
  foodStock.on("value", readStock);

  foodObj = new Food();

  feed = createButton("Feed the Dog");
  feed.position(700, 95);
  feed.mousePressed(feedDog());

  addFood = createButton("Add Food");
  addFood.position(800, 95);
  addFood.mousePressed(foodObj.updateFoodStock(foodS + 1));
}

function readStock(data)
{
  foodS=data.val();
  console.log(foodS);
}

function feedDog()
{
  dogSprite.addImage(happyDog);

  foodObj.deductFood(foodS - 1);
  database.ref('/').update
  (
    {
      fedTime:hour()
    }
  )
}

function draw() 
{
  //background(46, 139, 87);

  if(bgIMG)   
    background(bgIMG);

    console.log(foodS);
  
  fedTime = database.ref('Feed Time');
  fedTime.on("value", function(data)
  {
    lastFed = data.val();
  });

  fill(255, 255, 254);
  textSize(15);
  if(lastFed >= 12)
  {
    text("Last Feed: " + lastFed % 12 + " PM", 350, 30);
  }
  else if(lastFed == 0)
  {
    text("Last Feed: 12 AM", 350, 30);
  }
  else
  {
    text("Last Feed: " + lastFed + " AM", 350, 30);
  }

  foodObj.display();

  text(foodS, 50, 50);
  console.log(foodS);

  drawSprites();
}