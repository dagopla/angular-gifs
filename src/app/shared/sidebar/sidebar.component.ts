import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent  {

  get historial(){
    return this.gifsService.historial;
  }

  SelecionarSidebar(itemH: string): void{
    this.gifsService.buscarGifs(itemH);
  }

  constructor(private gifsService: GifsService) { }


}
