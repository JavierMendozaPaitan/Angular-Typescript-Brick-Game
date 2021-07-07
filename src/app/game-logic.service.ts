import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameLogicService {

  canvas:any;
  ctx:any;

  x = 100;
  y = 100;
  xCollisionDetect = false;
  yCollisionDetect = false;

  paddleWidth = 80;
  paddleHeight = 20;

  ballMoveOffset = 10;
  brickStatus=[];
  brickCoordinateX:number[]=[];
  brickCoordinateY:number[]=[];
  scoreGet=0;

  constructor() {
    this.canvas = null;
    this.ctx = null;
   }

  setCanvasProperty(_canvas:any){
    console.log("service called");
    this.canvas = _canvas;
    this.ctx = this.canvas.getContext('2d');
  }

  buildBricks()
  {
      let brickX = 0;
      let brickY = 0;
      let totalBricks = 15;
      let inlineBricks = 5;
      for(let i=0;i<totalBricks;i++)
      {
          //this.brickStatus[i]=1;
          brickX = i%inlineBricks;
          brickY = Math.floor( i/inlineBricks );
          this.ctx.beginPath();
          this.ctx.rect(10+(90*brickX),10+(30*brickY),80,20);
          this.brickCoordinateX[i]= 10+(90*brickX);
          this.brickCoordinateY[i]= 10+(30*brickY);
          if(this.brickStatus[i]==1)
          {
              this.ctx.fillStyle = "green";
          }else if(this.brickStatus[i]==0)
          {
              this.ctx.fillStyle = "white";
          }
          
          this.ctx.fill();
          this.ctx.closePath();
      }
  }
  

  startPlaying( rightKeyPressed:boolean,leftKeyPressed:boolean){
    console.log("playing");
    this.buildBricks();
    console.log(rightKeyPressed,leftKeyPressed);
  }
}
