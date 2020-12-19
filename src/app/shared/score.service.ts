import {Injectable} from '@angular/core';

export interface Score{
  name1: string;
  name2: string;
  firstTeam: number;
  secondTeam: number;
}

export interface CurrentScore{
  points: number;
  lastChange: number;
}

@Injectable({providedIn: 'root'})
export class ScoreService {

  public score: CurrentScore = { points: 0, lastChange: 0};

  public totalScore: Score = { name1: 'Team1', name2: 'Team2', firstTeam: 0, secondTeam: 0};

  public deads: number = 0;

  plusScore(team: number, points: number){
    this.score.points += points;
    this.score.lastChange = team;
  }

  minusScore(team: number, points: number){
    this.score.points -= points;
    this.score.lastChange = team;
  }

  pushRoundResult(){
    if(this.score.lastChange==1){
      this.totalScore.firstTeam += this.score.points;
    } else if(this.score.lastChange==2) {
      this.totalScore.secondTeam += this.score.points;
    }
  }

  pullRoundResult(){
    if(this.score.lastChange==1){
      this.totalScore.firstTeam -= this.score.points;
    } else if(this.score.lastChange==2) {
      this.totalScore.secondTeam -= this.score.points;
    }
  }

  clearCurrentScore(){
    this.score.points = 0;
    this.score.lastChange = 0;
    this.deads = 0;
  }

  getCurrentTeam(){
      return this.deads > 2 ? 2 : 1;
  }
}
