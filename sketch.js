var bg, bgImg
var bottomGround
var topGround
var plane, planeImg
var plane2, plane2Img
var plane3, plane3Img

var alien, alienImg, alienG
var alien2, alien2Img 
var alien3, alien3Img
var alien4, alien4Img
var alien5, alien5Img


var bullet1, bullet2, bullet1Img, bullet2Img, bulletG 
var ultraBulletImg, ultraBullet, ultraBulletG
var alienBulletG, alienBullet, alienBulletImg

var shield, shieldImg, shieldDurability = 10, shieldG

var score = 0;
var energy = 1000;
var bullets = 30;
var health = 200;

var gamestate = 0;


function preload(){
  bgImg = loadImage("assets/bg.jpg")

  planeImg = loadImage("assets/plane1.png")
  plane2Img = loadImage("assets/plane2.png")
  plane3Img = loadImage("assets/plane3.png")

  shieldImg = loadImage("assets/shield.png")

  alienImg = loadImage("assets/alien1.png")
  alien2Img = loadImage("assets/alien2.png")
  alien3Img = loadImage("assets/alien3.png")
  alien4Img = loadImage("assets/alien4.png")
  alien5Img = loadImage("assets/alien5.png")

  alienBulletImg = loadImage("assets/alienBullet.png")
  ultraBulletImg = loadImage("assets/bullet2.png")
  bullet1Img = loadImage("assets/bullet.png")

}

function setup(){

  const canvas = createCanvas(1200,650)
  canvas.elt.addEventListener("contextmenu", (e) => e.preventDefault())

  //background image
  bg = createSprite(600,350,1,1);
  bg.addImage(bgImg);
  bg.scale = 0.45  

  //creating top and bottom grounds
  bottomGround = createSprite(200,390,800,20);
  bottomGround.visible = false;

  topGround = createSprite(200,10,800,20);
  topGround.visible = false;
      
  //creating plane     
  plane = createSprite(150,200,20,50);
  plane.addImage("plane",plane3Img);
  plane.scale = 0.3
  plane.rotation = -90

  alienG = new Group()
  bulletG = new Group();
  ultraBulletG = new Group();
  alienBulletG = new Group();
  shieldG = new Group();
 
  gamestate = 0;


}

function draw() {
        
      //making the plane move
      if(keyDown("w")) {
        plane.y -= 15 ;
      }

      if(keyDown("s")) {
        plane.y += 15 ;
      }

      for(i=0;i<shieldG;i++){
       shieldG[i] = plane.y
      }
      

      if(keyWentDown('k')){
        createShield()
      }
      
      if(keyIsDown('k')){
        energy-=2
      }
      
      if(keyWentUp('k')){
        shieldG.destroyEach()
      }

      //105, 550

      // stopping player leaving boundaries
      
      if(plane.position.y < 105){
        plane.position.y = 105
      }

      if(plane.position.y > 550){
        plane.position.y = 550
      }


      for(var i=0;i<alienG.length;i++){     
             
        if(alienG[i].isTouching(plane)){
          alienG[i].destroy()
          health -= 20
          energy -= 20
        }

      }

      for(var i=0;i<alienBulletG.length;i++){     
            
        if(alienBulletG[i].isTouching(shieldG)){
          alienBulletG[i].destroy()
        }  

       }
      
       if(health <= 0){
        plane.destroy()
        alienG.destroyEach()
        bulletG.destroyEach()
        alienBulletG.destroyEach()
        gamestate = 1

       }

       // health regen
      if(frameCount % 50 == 0 && gamestate == 0){
        health += 10
      }


      //creating alien
      if(frameCount % 60 == 0 && gamestate == 0){
        randomN = Math.round(random(0,4))
        energy += 2
        bullets += 2
      
        if(randomN == 0){
          alien = createSprite(1050, random(50, 600), 20, 20);
          alien.addImage("alien",alienImg);
          alien.scale = 0.4
          alien.velocityX = -1.5
          alienG.add(alien)

        }
        
        if(randomN == 1){
          alien2 = createSprite(1050, random(50, 600), 20, 20);
          alien2.addImage("alien2",alien2Img);
          alien2.scale = 0.4 
          alien2.velocityX = -1.5
          alienG.add(alien2)
          
        }

        if(randomN == 2){
          alien3 = createSprite(1050, random(50, 600), 20, 20);
          alien3.addImage("alien3",alien3Img);
          alien3.scale = 0.4
          alien3.velocityX = -1.5
          alienG.add(alien3)
          
        }

        if(randomN == 3){
          alien4 = createSprite(1050, random(50, 600), 20, 20);
          alien4.addImage("alien4",alien4Img);
          alien4.scale = 0.4 
          alien4.velocityX = -1.5
          alienG.add(alien4)
          
        }

        if(randomN == 4){
          alien5 = createSprite(1050, random(50, 600), 20, 20);
          alien5.addImage("alien5",alien5Img);
          alien5.scale = 0.4 
          alien5.velocityX = -1.5
          alienG.add(alien5)
          
        }
        }
        
        for(var i=0;i<alienG.length;i++){     
             
         if(alienG[i].isTouching(bulletG)){
              alienG[i].destroy()
              bulletG.destroyEach()
              score += 5
              energy += 5
              } 
        }

        for(var i=0;i<alienG.length;i++){     
             
          if(alienG[i].isTouching(ultraBulletG)){
            alienG[i].destroy()
            score += 5
            energy += 5
          } 
          
        }

        for(var i=0;i<alienBulletG.length;i++){     
             
          if(alienBulletG[i].isTouching(plane)){
            alienBulletG[i].destroy()
            score -= 5
            energy -=5 
            health -= 10
          } 
          
        }
        
        for(var i=0;i<alienG.length;i++){

          if(frameCount % 100 == 0 && gamestate == 0){
            alienBullet = createSprite(alienG[i].x - 20, alienG[i].y, 20, 20);
            alienBullet.addImage("alienBullet.", alienBulletImg)
            alienBullet.scale = 0.4
            alienBullet.velocityX = -10
            alienBullet.rotation = 180
            alienBulletG.add(alienBullet)
          }
        }
        
 
        drawSprites();
        
        textSize(25)
        text("Score: "+ score, 40, 50)
        text("Energy: "+ energy, 40, 85)
        text("Bullets: "+ bullets, 40, 125)
        text("Health:" + health, 40, 160)

        if(gamestate == 1){
          bg.destroy()
          textSize(50)
          text("You Died!", (width/2) - 100, height/2)
        }
      
}
    

function mousePressed(){
  if(mouseButton == LEFT && bullets > 0){
    bullet1 = createSprite(plane.x + 30, plane.y, 20, 20);
    bullet1.addImage("bullet", bullet1Img)
    bullet1.scale = 0.4
    bullet1.velocityX = 20
    bulletG.add(bullet1)
    bullets -= 1
   
  }

  if(mouseButton == RIGHT && energy >= 50){
    ultraBullet = createSprite(plane.x + 140, plane.y, 20, 20);
    ultraBullet.addImage("Ultrabullet", ultraBulletImg)
    ultraBullet.scale = 0.2
    ultraBullet.velocityX = 15
    ultraBullet.rotation = 0
    ultraBulletG.add(ultraBullet)
    energy -= 50
  }
}


function createShield(){
  if(energy > 0 && energy - 30 > 0 ){
    shield = createSprite(plane.x + 75, plane.y, 20, 20);
    shield.addImage("shield", shieldImg)
    shield.scale = 2
    shield.rotation = 90
    shieldG.add(shield)
    energy -= 30

    console.log(shield.y)
  }
}
