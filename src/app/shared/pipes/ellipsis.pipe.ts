import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ellipsis'
})
export class EllipsisPipe implements PipeTransform {
  transform(value: any[]): any {
    let maxChar: number = 47;
    let displayArtistName: string = '';
    let currentIndex = 0;
    let temp:{name: string, type: string}[]=[]
    if (!Array.isArray(value)) {
      return value;
    }
    for(let i=0;i<value.length;i++){
      if((displayArtistName+value[i].name).length + (i*2) <= maxChar){
        displayArtistName=displayArtistName+value[i].name;
        currentIndex=i;
        temp.push({name:value[i].name, type: 'if'})
      }else{
        let currentName = '';
        currentIndex=i;
        for(let j=0; j< value[i].name.length;j++){
          currentName = currentName+value[i].name.charAt(j);
          let currentLength = (displayArtistName+value[i].name.charAt(j)).length;
          if(currentLength+(i*2)<=maxChar)
          value[currentIndex]={name: currentName};
        }
        value[currentIndex]={name: currentName+'...'}
        temp.push({name:value[i].name, type: 'else'})
        break;
      }
    }
    return value.slice(0, currentIndex+1);
  }
}
