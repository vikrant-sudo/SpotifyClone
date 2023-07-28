import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {API_CONFIG} from '../api.config'
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  baseUrl = API_CONFIG.baseUrl;
  constructor(private http: HttpClient, private authService: AuthService) { }

  getCategories() {
    const endpoint = 'browse/categories'
    const url = this.baseUrl + endpoint;
    // Set the Authorization header with the token
    const headers = new HttpHeaders().set('Authorization', ("Bearer "+this.authService.getAccessToken()));
    const params = new HttpParams()
      .set('limit', 50);
    return this.http.get(url, {headers, params});
  }
  getCategoryPlaylist(categoryId: string){
    const endpoint = `browse/categories/${categoryId}/playlists`
    const url = this.baseUrl + endpoint;
    // Set the Authorization header with the token
    const headers = new HttpHeaders().set('Authorization', ("Bearer "+this.authService.getAccessToken()));
    return this.http.get(url, {headers})
  }
  getPlaylistDetailsById(playlistId: string){
    const endpoint = `playlists/${playlistId}`
    const url = this.baseUrl + endpoint;
    // Set the Authorization header with the token
    const headers = new HttpHeaders().set('Authorization', ("Bearer "+this.authService.getAccessToken()));
    // console.log('url called ', url)
    return this.http.get(url, {headers})
  }
  
}
