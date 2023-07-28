import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-invalid-json',
  templateUrl: './invalid-json.component.html',
  styleUrls: ['./invalid-json.component.css']
})
export class InvalidJsonComponent {
  constructor(private router: Router){}
  tryAgain(){
    this.router.navigate(['translator-app'])
  }
}
