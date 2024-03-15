import { Component } from '@angular/core';

@Component({
  selector: 'app-gradient-color',
  templateUrl: './gradient-color.component.html',
  styleUrls: ['./gradient-color.component.scss']
})
export class GradientColorComponent {
  figure: any;
  img: any;
  
  changeColor(event: any) {
    this.figure = document.querySelector('figure') ?? undefined;
    this.img = this.figure?.firstChild;
      this.img.setAttribute('src', '');
      this.figure.style.background = event.target.style.background;
      localStorage.setItem('imageColor', event.target.style.background)
      localStorage.removeItem('imageSrc')
  }
}
