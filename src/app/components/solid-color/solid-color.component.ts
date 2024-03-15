import { Component } from '@angular/core';

@Component({
  selector: 'app-solid-color',
  templateUrl: './solid-color.component.html',
  styleUrls: ['./solid-color.component.scss']
})
export class SolidColorComponent {
  color: string | undefined;
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

  pickColor(event: any) {
    this.figure = document.querySelector('figure') ?? undefined;
    this.figure.style.background = event.value
    localStorage.setItem('imageColor', event.value)
    localStorage.removeItem('imageSrc')
  }

}
