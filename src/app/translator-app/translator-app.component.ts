import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-translator-app',
  templateUrl: './translator-app.component.html',
  styleUrls: ['./translator-app.component.css']
})
export class TranslatorAppComponent {
  constructor(private router: Router, private route: ActivatedRoute){}
  fileExtension: string[] = [];

  selectFile(event: any){
    const file: File = event.target.files[0];
    this.fileExtension = file.name.split('.');
    if(this.fileExtension[this.fileExtension.length-1]==='json'){
      // console.log('click on button ', file);
      this.router.navigate(['valid-json'])
    }else{
      // console.log('selected wrong file');
      this.router.navigate(['invalid-json'])
    }
    
  }

}
