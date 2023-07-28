import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  accessToken: string = '';
  getAccessToken(){
    return this.accessToken;
  }
  setAccessToken(access_token: string){
    this.accessToken=access_token;
  }
  clearAccessToken(){
    this.accessToken='';
  }
}
