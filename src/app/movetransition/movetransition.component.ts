import { Component, OnInit } from '@angular/core';
import {ScoreService} from '../shared/score.service';

@Component({
  selector: 'app-movetransition',
  templateUrl: './movetransition.component.html',
  styleUrls: ['./movetransition.component.css']
})
export class MovetransitionComponent implements OnInit {

  constructor(public scoreService: ScoreService) { }

  ngOnInit(): void {
  }

}
