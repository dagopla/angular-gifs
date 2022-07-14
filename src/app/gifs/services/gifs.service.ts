import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gifs, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string= 'wcddRXM55YLlW56hc9t5wY7enpYHPdlf';
  private BaseUrl: string= 'https://api.giphy.com/v1/gifs'
  private _historial: string[]=[];
  public resultados: Gifs[]= [];


  get historial(){
    return [...this._historial];

  }
  constructor(private http:HttpClient){
    this._historial= JSON.parse(localStorage.getItem('historial')!) || [];
      this.resultados= JSON.parse(localStorage.getItem('resultadosG')!) ||[];
    // if(localStorage.getItem('historial')){
    //   this._historial = JSON.parse(localStorage.getItem('historial')!);    }
  }


  buscarGifs(query:string){
    query =query.trim().toLocaleLowerCase();
    if (!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,9);
      console.log(this._historial);
      

      localStorage.setItem('historial', JSON.stringify(this._historial));
      //localStorage.setItem('resultadosG', this.resultados);
    }


    const params = new HttpParams()
          .set('api_key', this.apiKey)
          .set('limit', '10')
          .set('q', query);
    

    this.http.get<SearchGifsResponse>(`${this.BaseUrl}/search`, {params})
      .subscribe((response) =>{
        //console.log(response);
        this.resultados = response.data;
        console.log(this.resultados);
        localStorage.setItem('resultadosG', JSON.stringify(this.resultados));
      })
  }

}
