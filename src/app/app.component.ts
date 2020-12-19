import { Component } from '@angular/core';
import {ScoreService} from './shared/score.service';
import {Route, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Game title';

  constructor(private scoreService: ScoreService, private router: Router) {
  }

  onResetClick(){
    this.scoreService.resetTotalScore();
    //this.router.navigate(['/game']);
    location.reload();
  }
}


