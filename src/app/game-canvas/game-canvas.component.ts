import { Component, OnInit } from '@angular/core';
import {GameLogicService} from '../game-logic.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-game-canvas',
  templateUrl: './game-canvas.component.html',
  styleUrls: ['./game-canvas.component.css']
})
export class GameCanvasComponent implements OnInit {

  intervalTemp:any;
  constructor(private gameLogicService:GameLogicService) { }

  ngOnInit(): void {
    
    let test = document.querySelector('canvas');
    this.gameLogicService.setCanvasProperty(test);
  }

  startGame(){
    
    // this.intervalTemp = interval(100).subscribe((func => {
    //   this.gameLogicService.startPlaying();
    // }))
  }
  stopGame(){
    console.log("Stoping");
    clearInterval(this.intervalTemp);
  }

}
