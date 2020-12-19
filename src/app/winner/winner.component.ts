import { Component, OnInit } from '@angular/core';
import {ScoreService} from '../shared/score.service';

@Component({
  selector: 'app-winner',
  templateUrl: './winner.component.html',
  styleUrls: ['./winner.component.css']
})
export class WinnerComponent implements OnInit {

  constructor(public scoreService: ScoreService) { }

  ngOnInit(): void {
  }

  getWinner(){
    if(this.scoreService.totalScore.firstTeam>this.scoreService.totalScore.secondTeam){
      return this.scoreService.totalScore.name1;
    } else {
      return this.scoreService.totalScore.name2;
    }
  }

}
