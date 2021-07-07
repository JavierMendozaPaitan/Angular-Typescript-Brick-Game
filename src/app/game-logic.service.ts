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
  brickStatus:number[]=[];
  brickCoordinateX:number[]=[];
  brickCoordinateY:number[]=[];
  scoreGet=0;
  paddleX = 0;
  paddleY = 0;

  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.brickStatus = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    
   }

  setCanvasProperty(_canvas:any){
    console.log("service called");
    this.canvas = _canvas;
    this.ctx = this.canvas.getContext('2d');
    this.paddleX = this.canvas.width/2-this.paddleWidth/2;
    this.paddleY = this.canvas.height-this.paddleHeight;
  }
  setKeyboardCordinates(rightKeyPressed:boolean,leftKeyPressed:boolean)
  {
    if(rightKeyPressed)
        {
            if(this.paddleX+80<this.canvas.width)
            {
                this.paddleX+=20;
            }
            
        }
        if(leftKeyPressed)
        {
            if(this.paddleX>0)
            {
                this.paddleX-=20;
            }
            
        }
  }

  changeBallCordinates()
  {
      if(this.x==this.canvas.width-10)
      {
          this.xCollisionDetect = true;
      }else if(this.x==10)
      {
          this.xCollisionDetect = false;
      }
  
  
      if(!this.xCollisionDetect)
      {
          this.x+=this.ballMoveOffset;
      }
      else if(this.xCollisionDetect){
          this.x-=this.ballMoveOffset;
      }
  
      
      if(this.y==this.canvas.height-30)
      {
          if(this.x<this.paddleX+80 && this.x>this.paddleX)
          {
              this.yCollisionDetect = true;
          }
          else{
              alert("game over");
              document.location.reload();
              //clearInterval(interval);
          }
      } 
      
      if(this.y<=80)
      {
          for(let i=this.brickStatus.length-1;i>0;i--)
          {
              if(this.brickStatus[i]==1)
              {
                  if(this.x<this.brickCoordinateX[i]+80 && this.x>this.brickCoordinateX[i] &&
                      this.y<this.brickCoordinateY[i]+20 && this.y>this.brickCoordinateY[i])
                  {
                      
                      this.yCollisionDetect = false;
                      this.scoreGet+=1;
                      //this.score.innerText=this.scoreGet;

                      console.log('hitted',this.y, this.brickCoordinateY[i],i);
                      this.brickStatus[i]=0;
                      
                  }

              }
          }
          if(this.y<20)
          {
              this.yCollisionDetect = false;
          }
      }
  
  
      if(!this.yCollisionDetect)
      {
          this.y+=this.ballMoveOffset;
      }
      else if(this.yCollisionDetect){
          this.y-=this.ballMoveOffset;
      }
      //console.log(this.x,'sd',this.y);
  }
  
  buildBall()
    {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, 10, 0, Math.PI*2, false);
        this.ctx.fillStyle = "green";
        this.ctx.fill();
        this.ctx.closePath();
    }
  buildPaddle()
    {
        this.ctx.beginPath();
        this.ctx.rect(this.paddleX,this.paddleY,this.paddleWidth,this.paddleHeight);
        this.ctx.fillStyle = "green";
        this.ctx.fill();
        this.ctx.closePath();
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
    //console.log("playing");
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.buildBricks();
    this.setKeyboardCordinates(rightKeyPressed,leftKeyPressed);
    this.changeBallCordinates();
    this.buildPaddle();
    this.buildBall();
    //console.log(rightKeyPressed,leftKeyPressed);
  }
}
