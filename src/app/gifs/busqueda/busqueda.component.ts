import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent {

  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;
  constructor(private gifsService: GifsService){}
  buscar(){
    const valor= this.txtBuscar.nativeElement.value;
    if (valor.trim()==''){
      return;
    }
    this.gifsService.buscarGifs(valor);
    console.log(valor);
    this.txtBuscar.nativeElement.value='';

  }
}
