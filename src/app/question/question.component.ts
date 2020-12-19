import { Component, OnInit } from '@angular/core';
import {ItemsService} from '../shared/items.service';
import {ScoreService} from '../shared/score.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  constructor(public itemsService: ItemsService, public scoreService: ScoreService, private _snackBar: MatSnackBar) { }


  ngOnInit(): void {
  }

  next(){
    if(this.itemsService.getCurrentItem().completed) {
      this.scoreService.clearCurrentScore();
      this.itemsService.nextQuestion();
    }
  }

  prev(){
    //this.scoreService.clearCurrentScore();
    this.itemsService.prevQuestion();
  }

  roundFinished(id: number){
    this.itemsService.onToggleItem(id);
    console.log('round finished: ' + this.itemsService.getCurrentItem().completed);
    if(this.itemsService.getCurrentItem().completed){
      this.scoreService.pushRoundResult();
    } else {
      this.scoreService.pullRoundResult();
    }
  }

  wrongAnswer(){
    console.log('wrong: '+this.scoreService.deads)
    if(this.scoreService.deads < 3){
      console.log('w changed');
      this.scoreService.deads++;
      this.openSnackBar('Осталось попыток: '+ (3-this.scoreService.deads) , 'Промах!')
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }


}
