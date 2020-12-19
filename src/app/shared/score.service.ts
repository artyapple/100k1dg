import {Injectable} from '@angular/core';
import {WinnerComponent} from '../winner/winner.component';
import {MovetransitionComponent} from '../movetransition/movetransition.component';

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

  constructor() {
    this._totalScore = this._totalDefaultScore;
  }

  public score: CurrentScore = { points: 0, lastChange: 0};

  private _totalScore: Score;
  private _totalScoreInit: boolean = false;
  private _totalDefaultScore: Score = { name1: 'Team1', name2: 'Team2', firstTeam: 0, secondTeam: 0};

  public get totalScore(): Score{
    if(this._totalScoreInit){
      return this._totalScore;
    }
    this._totalScoreInit = true;
    const readedScore = localStorage.getItem('score');
    if(readedScore){
      const score = <Score>JSON.parse(readedScore);
      this._totalScore = score;
      return this._totalScore;
    }

    this._totalScore = this._totalDefaultScore;
    return this._totalScore;
  }

  private saveTotalScore(){
    localStorage.setItem('score', JSON.stringify(this._totalScore));
  }

  public resetTotalScore(){
    localStorage.removeItem('score');
    this._totalScoreInit = false;
    //this._totalScore = this._totalDefaultScore;
  }

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
    this.saveTotalScore();
  }

  pullRoundResult(){
    if(this.score.lastChange==1){
      this.totalScore.firstTeam -= this.score.points;
    } else if(this.score.lastChange==2) {
      this.totalScore.secondTeam -= this.score.points;
    }
    this.saveTotalScore();
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
