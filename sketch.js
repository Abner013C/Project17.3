//IMPORTANTE!!!   

//Los dos audios predeterminados para el cuchillo y game over están sobrepuestos con otro audio 
//Los cargué correctamente, y funcionan a la perfeccion excepto por el detallé de arriba





//declaracion de variables
var PLAY=1;
var END=0;
var gameState=1;

var knife,fruit ,monster,fruitGroup,monsterGroup, score,r,randomFruit, position;
var knifeImage , fruit1, fruit2 ,fruit3,fruit4, monsterImage, gameOverImage;
var gameoversound, knifewooshsound;
var bcg, bcgImg;


function preload(){
  
  //carga de imagenes
  knifeImage = loadImage("knife.png");
  monsterImage = loadAnimation("alien1.png","alien2.png");
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverImage = loadImage("gameover.png");
  bcgImg= loadImage("FNbcg.png");
  
  //cargo sonidos del juego
  gameoversound= loadSound("gameover.mp3");
  knifewooshsound= loadSound("knifeSwoosh.mp3");
}  



function setup() {
   createCanvas(600, 600);
  
   //creo el fondo
   bcg= createSprite(300,300,10,10);
   bcg.addImage("background", bcgImg);
   bcg.scale= 0.9;
  
   //crea la espada/cuchillo
   knife=createSprite(40,200,20,20);
   knife.addImage(knifeImage);
   knife.scale=0.7
  
   //establece la colisión para el cuchillo
   knife.setCollider("rectangle",0,0,40,40);

   //Puntuación de Variables y Grupos
   score=0;
   fruitGroup=createGroup();
   monsterGroup=createGroup();
  
}

function draw() {
  background("lightblue");
  
  if(gameState===PLAY){
    
    //Llama la función de frutas y Monstruo
    fruits();
    Monster();
    
    //Mueve la espada/cuchillo con el ratón
    knife.y=World.mouseY;
    knife.x=World.mouseX;
  
    //Incrementa la puntuación si el cuchillo toca la fruta
    if(fruitGroup.isTouching(knife)){
      fruitGroup.destroyEach();
      score= score+2;
      knifewooshsound.play();
    }
    else
    {
      // Ve al estado del juego: end, si el cuchillo toca al enemigo
      if(monsterGroup.isTouching(knife)){
        
        //sonido y gamestate
        gameoversound.play();
        gameState=END;
    
        fruitGroup.destroyEach();
        monsterGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        monsterGroup.setVelocityXEach(0);
        
        //Cambia la animación de la espada a gameover y reinicia su posición
        knife.addImage(gameOverImage);
        knife.scale=2;
        knife.x=300;
        knife.y=300;
      }
    }
  }
  
  drawSprites();
  //Muestra la puntuación
  fill("white");
  textSize(20);
  text("Puntuación : "+ score,230,50);
}


function Monster(){
  if(World.frameCount%200===0){
    monster=createSprite(400,200,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y=Math.round(random(100,550));
    monster.velocityX = -(8+score/10);
    monster.setLifetime=50;
    
    monsterGroup.add(monster);
  }
}

function fruits(){
  if(World.frameCount%80===0){
    position = Math.round(random(1,2));
    fruit=createSprite(400,200,20,20);
    
    if(position==1){
       fruit.x=600;
       fruit.y= Math.random(0,600);
      
       //velocidad de la fruta de acuerdo al puntaje
       fruit.velocityX=-(7+score/4);
    } else {
    if(position==2){
       fruit.x=0;
       fruit.y= Math.random(0,600);
      
       //velocidad de la fruta de acuerdo al puntaje  
       fruit.velocityX= (7+score/4);
    }
  }
    
    fruit.scale=0.2;
    //fruit.debug=true;
    r=Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }
    
    fruit.y=Math.round(random(50,550));
   
    
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
  }
}