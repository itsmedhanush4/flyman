var fly, flyImg
var ground
var ground2
var ufo, ufoImg
var ufoGroup
var score
var gamestate

function preload() {
  ufoImg = loadImage("ufo.png")

  flyImg = loadImage("player.png")

}


function setup() {
  createCanvas(600, 700);

  ground = createSprite(300, 690, 600, 20);
  ground2 = createSprite(0, 350, 20, 700);

  ufoGroup = createGroup()

  fly = createSprite(100, 160);
  fly.addImage(flyImg);
  fly.scale = 0.4;

  score = 0
  gamestate = "play"

}

function ofu() {
  if (frameCount % 50 == 0) {
    ufo = createSprite(700, random(40, 650))
    ufo.addImage(ufoImg)
    ufo.scale = 0.1;
    ufo.lifetime = 200
    ufo.velocityX = -5;
    ufoGroup.add(ufo)
  }
}


function draw() {
  background("blue");
  if (gamestate == "play") {
    if (keyDown(DOWN_ARROW)) {
      fly.velocityY = 5;
    }
    if (keyDown(UP_ARROW)) {
      fly.velocityY = -5
    }
    for (var i = 0; i < ufoGroup.length; i++) {
      if (ufoGroup[i].isTouching(fly)) {
        ufoGroup[i].destroy()
        score = score + 1
      }
    }
    if (ground.isTouching(fly)) {
      gamestate="end"
    }
    if (ground2.isTouching(ufoGroup)) {
      gamestate="end"
    }
  }
  if (gamestate=="end") {
    fill(rgb(random(0,255),random(0,255),random(0,255)))
      textSize(30)
      text("GAME OVER aliens have envaded", 100, 350)
      fly.destroy()
  }



  ofu()
  drawSprites()
  fill("white")
  textSize(20)
  text("score=" + score, 500, 50)
}



