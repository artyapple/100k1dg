import {Component, OnInit} from '@angular/core';
import {ItemsService} from '../shared/items.service';
import {ScoreService} from '../shared/score.service';
import {ThemePalette} from '@angular/material/core';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  panelOpenState = false;

  constructor(public itemsService: ItemsService, public scoreService: ScoreService) { }

  public color: ThemePalette = 'primary';

  ngOnInit(): void {
    this.itemsService.getCurrentItem();
  }

  changeScore(team: number, id: number){
    this.itemsService.onToggleAnswer(id);
    if(!this.itemsService.getCurrentItem().completed) {
      const a = this.itemsService.getCurrentAnswer(id);
      if (a.completed) {
        this.scoreService.plusScore(team, a.points);
      } else {
        this.scoreService.minusScore(team, a.points);
      }
    }
  }
}
