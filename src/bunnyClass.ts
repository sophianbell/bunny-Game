//class for bunny sprite
import * as PIXI from "pixi.js";

export class Bunny {
  public sprite: PIXI.Sprite;
  public speed: number = 7; //8
  public points: number = 1;
  public color: any;
  public type: number;
  public direction: number = Math.random() * Math.PI * 2;
  public turningSpeed: number = Math.random() - 0.8;

  public constructor(
    sprite: PIXI.Sprite,
    height: number,
    width: number,
    bunType: number
  ) {
    this.sprite = sprite;
    this.sprite.anchor.set(0.5);
    this.sprite.x = Math.random() * width;
    this.sprite.y = Math.random() * height;
    this.sprite.eventMode = "static";
    this.sprite.cursor = "pointer";
    this.type = bunType;

    if (this.type == 1) {
      this.sprite.scale.set(3);
      this.sprite.tint = "rgb(255,255,255)";
    } else if (this.type == 2) {
      this.sprite.scale.set(2.5);
      this.speed = 8; //9
      this.points = 2;
      this.sprite.tint = "rgb(255,0,0)";
    } else if (this.type == 3) {
      this.sprite.scale.set(2);
      this.speed = 10; //11
      this.points = 4;
      this.sprite.tint = "rgb(0,0,255)";
    }
    this.color = this.sprite.tint;
  }

  public scare() {
    this.direction = Math.random() * Math.PI * 2;
  }

  public movement(bunnyBounds: PIXI.Rectangle) {
    this.direction += this.turningSpeed * 0.01;
    this.sprite.x += Math.sin(this.direction) * this.speed;
    this.sprite.y += Math.cos(this.direction) * this.speed;
    this.sprite.rotation = -this.direction - Math.PI / 2;

    // wrap the bunny by testing the bounds
    if (this.sprite.x < bunnyBounds.x) {
      this.sprite.x += bunnyBounds.width;
    } else if (this.sprite.x > bunnyBounds.x + bunnyBounds.width) {
      this.sprite.x -= bunnyBounds.width;
    }

    if (this.sprite.y < bunnyBounds.y) {
      this.sprite.y += bunnyBounds.height;
    } else if (this.sprite.y > bunnyBounds.y + bunnyBounds.height) {
      this.sprite.y -= bunnyBounds.height;
    }
  }

  public onClick() {
    if (this.type == 1) {
      if (this.sprite.tint == this.color) {
        this.sprite.tint = "rgb(235,201,52)";
      } else {
        this.sprite.tint = "rgb(255,255,255)";
      }
    } else if (this.type == 2) {
      if (this.sprite.tint == this.color) {
        this.sprite.tint = "rgb(255,100,100)";
      } else {
        this.sprite.tint = "rgb(255,0,0)";
      }
    } else if (this.type == 3) {
      if (this.sprite.tint == this.color) {
        this.sprite.tint = "rgb(100,100,255)";
      } else {
        this.sprite.tint = "rgb(0,0,255)";
      }
    }
  }
}
