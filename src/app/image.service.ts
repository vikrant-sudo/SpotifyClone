import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  playlistImageUrl: string = '';
  setImageUrl(imageUrl: string){
    this.playlistImageUrl=imageUrl
  }
  getImageUrl(){
    return this.playlistImageUrl;
  }
  constructor() { }
}
