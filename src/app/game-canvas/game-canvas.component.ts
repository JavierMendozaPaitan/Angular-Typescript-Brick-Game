import { Component, HostListener, OnInit } from '@angular/core';
import {GameLogicService} from '../game-logic.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-game-canvas',
  templateUrl: './game-canvas.component.html',
  styleUrls: ['./game-canvas.component.css']
})
export class GameCanvasComponent implements OnInit {

  intervalTemp:any;
  rightArrowClicked:boolean = false;
  leftArrowClicked:boolean = false;
  constructor(private gameLogicService:GameLogicService) { }

  ngOnInit(): void {
    
    let canvas = document.querySelector('canvas');
    let scoreH1 = document.querySelector('#scoreCount');
    this.gameLogicService.setCanvasProperty(canvas,scoreH1);
    this.gameLogicService.startPlaying(this.rightArrowClicked,this.leftArrowClicked);
  }

  @HostListener('window:keydown', ['$event'])
  keyEventUp(event: KeyboardEvent) {
    if(event.key == 'ArrowRight')
    {
      this.rightArrowClicked = true;
      //console.log("down",event.key);
    }
    if(event.key == 'ArrowLeft')
    {
      this.leftArrowClicked = true;
      //console.log("down",event.key);
    }    
  }

  @HostListener('window:keyup', ['$event'])
  keyEventDown(event: KeyboardEvent) {
    if(event.key == 'ArrowRight' || event.key == 'ArrowLeft')
    {
      this.rightArrowClicked = false;
      this.leftArrowClicked = false;
    }
  }

  startGame(){
    
    this.intervalTemp = interval(100).subscribe((func => {
      this.gameLogicService.startPlaying(this.rightArrowClicked,this.leftArrowClicked);
    }))
  }
  stopGame(){
    console.log("Stoping");
    clearInterval(this.intervalTemp);
  }

}
