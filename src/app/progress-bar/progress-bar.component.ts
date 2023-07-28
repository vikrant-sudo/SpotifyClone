import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent {
  constructor(private router: Router){}
  percentage: number = 0;
  percentSymbole: string = '%';
  intervalId:any
  increasePrecentage = () =>{
    this.percentage=this.percentage+1;
    if(this.percentage==100){
      clearInterval(this.intervalId);
      this.router.navigate(['translation-successfull']);
    }
  }

  ngOnInit(){
    this.intervalId=setInterval(this.increasePrecentage, 43);
  }

}
