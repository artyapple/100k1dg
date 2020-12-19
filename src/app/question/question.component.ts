import { Component, OnInit } from '@angular/core';
import {ItemsService} from '../shared/items.service';
import {ScoreService} from '../shared/score.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {WinnerComponent} from '../winner/winner.component';
import {MovetransitionComponent} from '../movetransition/movetransition.component';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  constructor(public itemsService: ItemsService, public scoreService: ScoreService, public _snackBar: MatSnackBar, public dialog: MatDialog ) { }


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

    if(this.scoreService.deads==3){
      this.openDialog();
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  openDialog() {
    this.dialog.open(MovetransitionComponent);
  }

}
