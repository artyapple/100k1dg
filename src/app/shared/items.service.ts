import {Injectable} from '@angular/core';
import {WinnerComponent} from '../winner/winner.component';
import {MatDialog} from '@angular/material/dialog';

export interface Answer{
  id: number;
  answer: string;
  completed: boolean;
  points: number;
}

export interface Item{
  id: number;
  question: string;
  answers: Array<Answer>;
  completed: boolean;
  other: Array<string>;
}

@Injectable({providedIn: 'root'})
export class ItemsService {

  constructor(public dialog: MatDialog) {
  }

  public currentItem: number = 0;

  public answers1: Answer[] = [
    {id:1, answer:"Lorem ipsum dolor", completed: false, points: 12},
    {id:2, answer:"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam", completed: false, points: 11},
    {id:3, answer:"Lorem ipsum dolor sit amet", completed: false, points: 14},
    {id:4, answer:"Lorem ipsum dolor", completed: false, points: 12},
    {id:5, answer:"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam", completed: false, points: 11},
    {id:6, answer:"Lorem ipsum dolor sit amet", completed: false, points: 14}
  ];
  public answers2: Answer[] = [
    {id:1, answer:"2Lorem ipsum dolor", completed: false, points: 12},
    {id:2, answer:"2Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam", completed: false, points: 11},
    {id:3, answer:"2Lorem ipsum dolor sit amet", completed: false, points: 14},
    {id:4, answer:"2Lorem ipsum dolor", completed: false, points: 12},
    {id:5, answer:"2Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam", completed: false, points: 11},
    {id:6, answer:"2Lorem ipsum dolor sit amet", completed: false, points: 14},
    {id:7, answer:"2Lorem ipsum dolor sit amet", completed: false, points: 14}
  ];

  public allItems: Item[] = [
    {id:1, question: "This is the first question?", answers: this.answers1, completed: false, other: ["some string", "other string"]},
    {id:2, question: "This is the second question?", answers: this.answers2, completed: false, other: ["some 2 string", "other 2 string"]}
  ];

  getCurrentItem(){
    return this.allItems[this.currentItem];
  }

  onToggleItem(id: number){
    const idx = this.allItems.findIndex(i => i.id === id);
    this.allItems[idx].completed = !this.allItems[idx].completed;
  }

  getCurrentAnswer(id: number){
    const idx = this.getCurrentItem().answers.findIndex(i => i.id === id);
    return this. getCurrentItem().answers[idx];
  }

  onToggleAnswer(id: number){
    const idx = this.getCurrentItem().answers.findIndex(i => i.id === id);
    this.getCurrentItem().answers[idx].completed = !this.getCurrentItem().answers[idx].completed;
  }

  nextQuestion(){
    if(this.currentItem+1<this.allItems.length){
      console.log(this.currentItem);
      this.currentItem++;
      console.log(this.currentItem);
    } else {
      this.openDialog();
    }
  }

  prevQuestion(){
    if(this.currentItem-1>=0) {
      console.log(this.currentItem);
      this.currentItem--;
      console.log(this.currentItem);
    }
  }

  openDialog() {
    this.dialog.open(WinnerComponent);
  }

  isLastItem() {
    return (this.currentItem + 1 == this.allItems.length);
  }
}
