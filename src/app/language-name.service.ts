import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageNameService {

  constructor() { }
  destinationLnaguage: string = '';
}
