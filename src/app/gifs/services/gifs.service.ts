import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchResponse, Gif, SourceTLD } from '../interfaces/gifs.interfaces';

@Injectable({ providedIn: 'root' })
export class GifsService {

  public gifsList: Gif[] = []
  private _tagsHistory: string[] = [];
  private apiKye: string = 'IV5UW9nlvX03Eykzz3mu8y20kHCSm9Dy'
  private serviceUrls: string = 'https://api.giphy.com/v1/gifs'


  constructor(private http: HttpClient) {
    this.loadLocalStorage()
  }

  get tagsHistory() {
    return [...this._tagsHistory];
  }


  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();

    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag)
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this.tagsHistory.splice(0, 10);
    this.saveLocalStorage();
  }
  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage(): void {
    if (!localStorage.getItem('history')) return;
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);

    if (this._tagsHistory.length === 0) return;
    this.searchTag(this._tagsHistory[0]);
  }


  async searchTag(tag: string): Promise<void> {
    if (tag.length === 0) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKye)
      .set('q', tag)
      .set('limit', '15');


    this.http.get<SearchResponse>(`${this.serviceUrls}/search?`, { params })
      .subscribe(resp => {
        this.gifsList = resp.data;
      });

    // fetch('https://api.giphy.com/v1/gifs/search?api_key=IV5UW9nlvX03Eykzz3mu8y20kHCSm9Dy&q=valorant&limit=15')
    //   .then(resp => resp.json())
    //   .then(data => console.log(data));

    // otra forma de hacerlo con async await

    // const resp = await fetch('https://api.giphy.com/v1/gifs/search?api_key=IV5UW9nlvX03Eykzz3mu8y20kHCSm9Dy&q=valorant&limit=15')
    // const data = await resp.json();
    // console.log(data);

    // usando http client de angular




  }
}
