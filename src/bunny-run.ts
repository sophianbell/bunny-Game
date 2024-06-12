import * as PIXI from "pixi.js";
import { Bunny } from "./bunnyClass.js";

const app = new PIXI.Application({ resizeTo: window });

// set background
const background = PIXI.Sprite.from("https://pixijs.com/assets/bg_grass.jpg");
background.width = app.screen.width;
background.height = app.screen.height;
app.stage.addChild(background);
document.body.appendChild(app.view as any);

// bunny variables
let width = app.screen.width;
let height = app.screen.height;

// many bunny
const totalBun: number = 15;
const bunnys: Bunny[] = [];
let type: number = 1;

for (let i: number = 0; i < totalBun; i++) {
  let texture = PIXI.Sprite.from("https://pixijs.com/assets/bunny.png");
  if (i > 9 && i < 14) {
    type = 2;
  } else if (i > 13) {
    type = 3;
  }

  const bunny: Bunny = new Bunny(texture, height, width, type);
  bunnys.push(bunny);

  bunny.sprite.on("pointerdown", () => {
    bunny.onClick();
    hit += bunny.points;
  });
}

// bunnys apear
app.stage.addChild(bunnys[0].sprite);
for (let i: number = 1; i < totalBun; i++) {
  setTimeout(function timer() {
    const bunny: Bunny = bunnys[i];
    app.stage.addChild(bunny.sprite);
  }, i * 1500);
}

//counters
let counter: number = 0;
let hit: number = 0;

// timer
let timer: number = 30;
function updateTimer() {
  timer = timer - 1;
}
setInterval(updateTimer, 1000);

// add text
const skewStyle = new PIXI.TextStyle({
  fontFamily: "Arial",
  dropShadow: true,
  dropShadowAlpha: 0.8,
  dropShadowAngle: 2.1,
  dropShadowBlur: 4,
  dropShadowColor: "0x111111",
  dropShadowDistance: 10,
  fill: ["#ffffff"],
  stroke: "#004620",
  fontSize: 60,
  fontWeight: "lighter",
  lineJoin: "round",
  strokeThickness: 12,
});

const title = new PIXI.Text("Catch the bunny!", skewStyle);
//title.x = 300;
//title.y = 20;
title.x = app.screen.width / 2 - title.width / 2;
title.y = 20;

app.stage.addChild(title);

let hits = new PIXI.Text("Hits:" + hit);
//hits.x = 30;
//hits.y = 80;
hits.x = 20;
hits.y = 80;

app.stage.addChild(hits);

let time = new PIXI.Text("Timer:" + timer);
//time.x = background.width - 200;
time.x = app.screen.width - time.width - 35;
time.y = 80;

app.stage.addChild(time);

// create a bounding box for the little dude
const bunnyBoundsPadding = 100;
const bunnyBounds = new PIXI.Rectangle(
  -bunnyBoundsPadding,
  -bunnyBoundsPadding,
  app.screen.width + bunnyBoundsPadding * 2,
  app.screen.height + bunnyBoundsPadding * 2
);

app.ticker.add(() => {
  //update couner
  counter += 1;

  //very random bunny movements
  for (let i: number = 0; i < bunnys.length; i++) {
    if (counter % Math.floor(Math.random() * 10 + 20) == 0) {
      const bunny: Bunny = bunnys[i];
      bunny.scare();
    }
  }

  // updat text
  hits.text = "Hits:" + hit;
  time.text = "Time:" + timer;

  // updaye bunny movements and location
  for (let i: number = 0; i < bunnys.length; i++) {
    const bunny: Bunny = bunnys[i];
    bunny.movement(bunnyBounds);
  }

  if (timer == 0) {
    app.stage.removeChildren();
    const background = PIXI.Sprite.from(
      "https://pixijs.com/assets/bg_grass.jpg"
    );
    background.width = app.screen.width;
    background.height = app.screen.height;
    app.stage.addChild(background);
    document.body.appendChild(app.view as any);
    app.stage.addChild(title);

    const score = new PIXI.Text("Your Score:" + hit, skewStyle);
    //score.x = 350;
    //score.y = 200;
    score.x = background.width / 2 - score.width / 2;
    score.y = background.height / 2 - score.height + 40;

    app.stage.addChild(score);
  }
});
