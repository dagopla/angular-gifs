import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gifs, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private apiKey: string = 'wcddRXM55YLlW56hc9t5wY7enpYHPdlf';
  private BaseUrl: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];
  public resultados: Gifs[] = [];
  public page: number = 0;
  private _limit: number = 20;
  public get limit(): number {
    return this._limit;
  }
  public set limit(value: number) {
    this._limit = value;
  }
  private _lastQuery: string = '';
  public get lastQuery(): string {
    return this._lastQuery;
  }
  public set lastQuery(value: string) {
    this._lastQuery = value;
  }

  get historial() {
    return [...this._historial];
  }
  constructor(private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
  }

  buscarGifs(query: string) {
    query = query.trim().toLocaleLowerCase();
    this.lastQuery = query;
    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 9);
    }

    this.searchGifs(query);
  }
  searchGifs(query: string) {
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', this.limit.toString())
      .set('offset', this.page.toString())
      .set('q', query);
    this.http
      .get<SearchGifsResponse>(`${this.BaseUrl}/search`, { params })
      .subscribe((response) => {
        this.resultados = response.data;
        localStorage.setItem('lastQuery', this.lastQuery);
      });
  }
  nextPage() {
    this.page += this.limit;
    this.buscarGifs(this.lastQuery);
  }
  backPage() {
    if (this.page > 0) {
      this.page -= this.limit;
      this.buscarGifs(this.lastQuery);
    }
  }
  cleanLocal() {
    localStorage.clear();
    this.page = 0;
    this._historial = [];
  }
  changeLimit(imit:number){
    this.limit = imit;
    this.buscarGifs(this.lastQuery);
  }
}
