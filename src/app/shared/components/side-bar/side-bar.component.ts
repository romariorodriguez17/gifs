import { Component } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',

})
export class SidebarComponent {

  // private gifsService
  constructor(private gifsService: GifsService) { }

  get tags(): string[] {
    return this.gifsService.tagsHistory;
  }

  searchTag(tag: string): void {
    this.gifsService.searchTag(tag);
  }

  returnTag(tag: string): void {
    this.gifsService.searchTag(tag);
  }



}
