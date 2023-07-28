import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
    constructor(){}
    private dataSubject = new Subject<string>();

  setColor(color: string) {
    this.dataSubject.next(color);
  }

  getColor() {
    return this.dataSubject.asObservable();
  }
}
