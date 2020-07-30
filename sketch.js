//Create variables here
var dog, happyDog;
var database;
var foodS, foodStock;
var dogImg,happyDogImg;

function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png");
  
  happyDogImg = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
	createCanvas(500, 500);
  
  dog = createSprite(250,300,5,5);
  
  happyDog = createSprite(250,300,5,5);
  happyDog.addImage(happyDogImg);
  happyDogImg.scale = 0.2;
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
}


function draw() {  
  background(46,139,87);

  if(keyDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogImg);
  }
  drawSprites();
  text("Food Remaining:",100,200,fill("black"),textSize(20));
  

}
function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}
