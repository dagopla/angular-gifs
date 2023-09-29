import { Component, OnInit } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-gifs-page',
  templateUrl: './gifs-page.component.html',
  styleUrls: ['./gifs-page.component.css']
})
export class GifsPageComponent implements OnInit {

  limit: number = 20;
  constructor(private gifsService:GifsService) { }

  ngOnInit(): void {
  }
  changeLimit(){
    console.log(this.limit);
    
    this.gifsService.changeLimit(this.limit);
  }
}
